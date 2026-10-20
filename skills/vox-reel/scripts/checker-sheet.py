# Ghép các PNG đã tách nền lên nền caro để kiểm tra alpha. Usage: python checker-sheet.py <out.jpg> <png...>
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
W = H = 360; cols = 4; rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * W, rows * H), (200, 200, 200))
d = ImageDraw.Draw(sheet)
for k, f in enumerate(files):
    x, y = (k % cols) * W, (k // cols) * H
    for cy in range(0, H, 20):
        for cx in range(0, W, 20):
            if (cx // 20 + cy // 20) % 2: d.rectangle([x + cx, y + cy, x + cx + 19, y + cy + 19], fill=(150, 150, 150))
    im = Image.open(f).convert('RGBA'); im.thumbnail((W - 12, H - 12))
    sheet.paste(im, (x + 6, y + 6), im)
    d.rectangle([x, y, x + 200, y + 16], fill=(255, 200, 0)); d.text((x + 4, y + 3), f.split('/')[-1], fill=(0, 0, 0))
sheet.save(out, quality=85); print(out)
