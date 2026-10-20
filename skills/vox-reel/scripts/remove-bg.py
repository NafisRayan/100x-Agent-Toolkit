# Tách nền foreground bằng rembg. Usage: python remove-bg.py <src> <dst> [model] [maxpx]
import sys
from PIL import Image
from rembg import remove, new_session
src, dst = sys.argv[1], sys.argv[2]
model = sys.argv[3] if len(sys.argv) > 3 else 'u2net'
maxpx = int(sys.argv[4]) if len(sys.argv) > 4 else 2200
matting = (sys.argv[5] != 'nomat') if len(sys.argv) > 5 else True
im = Image.open(src).convert('RGB')
im.thumbnail((maxpx, maxpx))
out = remove(im, session=new_session(model), alpha_matting=matting, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15, alpha_matting_erode_size=8)
bbox = out.getbbox()
if bbox: out = out.crop(bbox)
out.save(dst)
print(f'{dst} {out.size}')
