# Ghép ứng viên của 1 slug thành 1 ảnh có đánh số để chọn nhanh.
import sys, glob, os
from PIL import Image, ImageDraw
slug = sys.argv[1]
files = sorted(glob.glob(f'assets/raw/cand/{slug}-*.jpg'), key=lambda p: int(p.rsplit('-',1)[1].split('.')[0]))
W, H, cols = 320, 320, 4
rows = (len(files)+cols-1)//cols
sheet = Image.new('RGB', (cols*W, rows*H), (40,40,40))
d = ImageDraw.Draw(sheet)
for k, f in enumerate(files):
    try: im = Image.open(f).convert('RGB')
    except Exception: continue
    im.thumbnail((W-8, H-8))
    x, y = (k%cols)*W, (k//cols)*H
    sheet.paste(im, (x+4, y+4))
    d.rectangle([x+4, y+4, x+40, y+28], fill=(255,200,0)); d.text((x+10, y+8), f'#{k}', fill=(0,0,0))
out = f'assets/raw/cand/_{slug}.jpg'; sheet.save(out, quality=80); print(out)
