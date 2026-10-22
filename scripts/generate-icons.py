#!/usr/bin/env python3
from PIL import Image
from pathlib import Path
import base64, io, os
from PIL import ImageDraw

os.makedirs('assets', exist_ok=True)

def load_logo():
    parts = sorted(Path('scripts').glob('logo_exact.b64.p*'))
    if parts:
        b64 = ''.join(p.read_text().strip() for p in parts)
        return Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGBA')
    single = Path('scripts/logo_exact.b64')
    if single.exists():
        return Image.open(io.BytesIO(base64.b64decode(single.read_text().strip()))).convert('RGBA')
    local = Path('assets/logo.png')
    if local.exists():
        return Image.open(local).convert('RGBA')
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([80, 100, 430, 380], fill=(30, 120, 255, 255))
    d.polygon([(150, 360), (200, 360), (120, 450)], fill=(20, 100, 240, 255))
    for dx in (180, 240, 300):
        d.ellipse([dx, 210, dx + 40, 250], fill=(230, 245, 255, 255))
    return img

im = load_logo()
im.save('assets/logo.png')
w, h = im.size
s = min(w, h)
sq = im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((1024, 1024), Image.Resampling.LANCZOS)
sq.save('assets/icon.png')
sq.save('assets/adaptive-icon.png')
fg = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
logo = sq.resize((800, 800), Image.Resampling.LANCZOS)
fg.paste(logo, (112, 112), logo)
fg.save('assets/android-icon-foreground.png')
Image.new('RGBA', (1024, 1024), (0, 0, 0, 255)).save('assets/android-icon-background.png')
splash = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
lw, lh = 700, int(700 * h / w)
l = im.resize((lw, lh), Image.Resampling.LANCZOS)
splash.paste(l, ((1024 - lw) // 2, (1024 - lh) // 2), l)
splash.save('assets/splash-icon.png')
print('icons from exact logo')
