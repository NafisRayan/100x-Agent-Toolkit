#!/usr/bin/env node
// Edge TTS (Microsoft Edge ReadAloud) — 100% free, no API key required.
// Male voice: en-US-AndrewNeural
// Female voice: en-IE-EmilyNeural
// Usage: node tts-edge.mjs <text-file-or-"-"> <out.mp3> [--voice male|female|<voice-name>]

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import crypto from 'node:crypto';
import { getEnv } from './env.mjs';

const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const CHROMIUM_FULL_VERSION = '143.0.3650.75';
const WINDOWS_FILE_TIME_EPOCH = 11644473600n;

const VOICES = {
  male: 'en-US-AndrewNeural',
  female: 'en-IE-EmilyNeural',
};

function generateSecMsGecToken() {
  const ticks = BigInt(Math.floor(Date.now() / 1000 + Number(WINDOWS_FILE_TIME_EPOCH))) * 10000000n;
  const roundedTicks = ticks - (ticks % 3000000000n);
  const strToHash = `${roundedTicks}${TRUSTED_CLIENT_TOKEN}`;
  const hash = crypto.createHash('sha256');
  hash.update(strToHash, 'ascii');
  return hash.digest('hex').toUpperCase();
}

function parseArgs() {
  const args = process.argv.slice(2);
  let textArg = null;
  let outArg = null;
  let voiceChoice = getEnv('EDGE_VOICE') || getEnv('VOICE') || getEnv('VOICE_GENDER') || 'male';

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--voice' || a === '-v') {
      voiceChoice = args[++i];
    } else if (!textArg) {
      textArg = a;
    } else if (!outArg) {
      outArg = a;
    }
  }

  const voice = VOICES[voiceChoice?.toLowerCase()] || voiceChoice || VOICES.male;
  const localeMatch = voice.match(/^[a-z]{2}-[A-Z]{2}/);
  const locale = localeMatch ? localeMatch[0] : 'en-US';

  return { textArg, outArg, voice, locale };
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}

function toSRTTime(totalSeconds) {
  const sec = Math.max(0, totalSeconds);
  const hours = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = Math.floor(sec % 60);
  const ms = Math.floor((sec - Math.floor(sec)) * 1000);
  const pad = (n, len = 2) => String(n).padStart(len, '0');
  return `${pad(hours)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`;
}

function createSilenceFrames(count = 15) {
  // 24kHz 48kbps MPEG-2 Layer III frame: 144 bytes per frame (~24ms silence each)
  const frame = Buffer.alloc(144);
  frame[0] = 0xff;
  frame[1] = 0xf3;
  frame[2] = 0x64;
  frame[3] = 0xc4;
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(frame);
  }
  return Buffer.concat(list);
}

function synthesizeSingleLine(text, voice, locale) {
  return new Promise((resolve, reject) => {
    const secMsGec = generateSecMsGecToken();
    const url = `wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1?Ocp-Apim-Subscription-Key=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=1-${CHROMIUM_FULL_VERSION}`;

    const ws = new WebSocket(url, {
      headers: {
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0`,
        'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
      },
    });

    const reqId = crypto.randomUUID().replace(/-/g, '');
    const audioChunks = [];
    const words = [];
    let timer = setTimeout(() => {
      try { ws.close(); } catch {}
      reject(new Error(`Edge TTS timeout for line: "${text.slice(0, 30)}..."`));
    }, 20000);

    ws.onopen = () => {
      ws.send('Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n' + JSON.stringify({
        context: {
          synthesis: {
            audio: {
              metadataoptions: {
                sentenceBoundaryEnabled: 'false',
                wordBoundaryEnabled: 'true',
              },
              outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
            },
          },
        },
      }));

      const safe = escapeXml(text);
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${locale}"><voice name="${voice}"><prosody pitch="+0Hz" rate="+0%" volume="+0%">${safe}</prosody></voice></speak>`;
      ws.send(`X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n${ssml}`);
    };

    ws.onmessage = async (event) => {
      if (typeof event.data !== 'string') {
        const buf = Buffer.from(event.data instanceof Blob ? await event.data.arrayBuffer() : event.data);
        const headerLen = buf.readUInt16BE(0);
        const audio = buf.subarray(2 + headerLen);
        if (audio.length > 0) audioChunks.push(audio);
      } else {
        const str = event.data;
        if (str.includes('Path:audio.metadata')) {
          const idx = str.indexOf('{');
          if (idx !== -1) {
            try {
              const meta = JSON.parse(str.slice(idx)).Metadata?.[0];
              if (meta && meta.Type === 'WordBoundary') {
                words.push({
                  word: meta.Data.text.Text,
                  offset: meta.Data.Offset / 10000000,
                  duration: meta.Data.Duration / 10000000,
                });
              }
            } catch {}
          }
        } else if (str.includes('Path:turn.end')) {
          clearTimeout(timer);
          ws.close();
          const audio = Buffer.concat(audioChunks);
          resolve({ audio, words });
        }
      }
    };

    ws.onerror = (err) => {
      clearTimeout(timer);
      reject(err);
    };
  });
}

async function main() {
  const { textArg, outArg, voice, locale } = parseArgs();
  if (!textArg || !outArg) {
    console.error('Usage: node scripts/tts-edge.mjs <text-file|-> <out.mp3> [--voice male|female|<voice>]');
    process.exit(1);
  }

  const rawText = (textArg === '-' ? readFileSync(0, 'utf8') : readFileSync(textArg, 'utf8')).trim();
  if (!rawText) {
    console.error('Lỗi: Text rỗng');
    process.exit(1);
  }

  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  if (!lines.length) {
    console.error('Lỗi: Không tìm thấy dòng thoại nào trong file');
    process.exit(1);
  }

  console.log(`[Edge TTS] Voice: ${voice} (${locale}) | Số dòng: ${lines.length}`);

  const outDir = dirname(outArg);
  if (outDir && outDir !== '.') {
    mkdirSync(outDir, { recursive: true });
  }

  const srtPath = outArg.replace(/\.mp3$/, '.srt');
  const allAudioParts = [];
  const srtEntries = [];

  let currentAudioTime = 0.05; // 50ms initial head room
  const pauseFrames = 15; // 15 frames * 24ms ≈ 360ms pause between scenes
  const pauseDuration = (pauseFrames * 144) / 6000;
  const silenceBuffer = createSilenceFrames(pauseFrames);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(`  [Line ${i + 1}/${lines.length}] Synthesizing: "${line.slice(0, 45)}..."`);

    let res;
    let attempts = 0;
    while (attempts < 3) {
      try {
        attempts++;
        res = await synthesizeSingleLine(line, voice, locale);
        break;
      } catch (err) {
        if (attempts >= 3) throw err;
        console.warn(`    Thử lại dòng ${i + 1} (lần ${attempts + 1})...`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    const { audio, words } = res;
    // Each 144 bytes is 24ms at 24kHz 48kbps MPEG-2 Layer III
    const audioSec = (audio.length / 144) * 0.024;

    const firstWordOffset = words.length ? words[0].offset : 0.0;
    const lastWord = words.length ? words[words.length - 1] : null;
    const lastWordEnd = lastWord ? lastWord.offset + lastWord.duration : audioSec;

    const speechStart = currentAudioTime + firstWordOffset;
    const speechEnd = currentAudioTime + lastWordEnd;

    srtEntries.push({
      index: i + 1,
      start: speechStart,
      end: speechEnd,
      text: line,
    });

    allAudioParts.push(audio);
    currentAudioTime += audioSec;

    if (i < lines.length - 1) {
      allAudioParts.push(silenceBuffer);
      currentAudioTime += pauseDuration;
    }
  }

  const totalAudio = Buffer.concat(allAudioParts);
  writeFileSync(outArg, totalAudio);

  const srtContent = srtEntries
    .map((e) => `${e.index}\n${toSRTTime(e.start)} --> ${toSRTTime(e.end)}\n${e.text}\n`)
    .join('\n');
  writeFileSync(srtPath, srtContent);

  console.log(`\n[Edge TTS] Hoàn tất:`);
  console.log(`  Audio:    ${outArg} (${(totalAudio.length / 1024).toFixed(1)} KB, ~${currentAudioTime.toFixed(2)}s)`);
  console.log(`  Subtitle: ${srtPath} (${srtEntries.length} blocks)`);
  console.log('\n--- Bảng Timing cho STORYBOARD.md ---');
  console.table(
    srtEntries.map((e) => ({
      Beat: e.index,
      Start: e.start.toFixed(2) + 's',
      End: e.end.toFixed(2) + 's',
      Duration: (e.end - e.start).toFixed(2) + 's',
      Text: e.text.slice(0, 40) + (e.text.length > 40 ? '...' : ''),
    }))
  );
}

main().catch((err) => {
  console.error('[Edge TTS] Lỗi nghiêm trọng:', err.message || err);
  process.exit(1);
});
