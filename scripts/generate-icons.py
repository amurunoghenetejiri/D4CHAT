#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os, math
os.makedirs('assets', exist_ok=True)

def make_logo(size=1024, bg=None):
    img = Image.new('RGBA', (size, size), bg or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2 + size // 40
    for i in range(14, 0, -1):
        a = i / 14
        col = (int(0 + 59 * a), int(180 + 50 * a), 255, int(200 * a + 55))
        d.ellipse([cx - size*0.42, cy - size*0.28, cx + size*0.42, cy + size*0.38], outline=col, width=max(2, size//80))
    bubble = [cx - size*0.28, cy - size*0.22, cx + size*0.32, cy + size*0.18]
    d.ellipse(bubble, fill=(30, 120, 255, 255))
    d.ellipse([cx - size*0.18, cy - size*0.18, cx + size*0.05, cy - size*0.02], fill=(120, 200, 255, 90))
    d.polygon([(cx - size*0.12, cy + size*0.12), (cx - size*0.02, cy + size*0.12), (cx - size*0.18, cy + size*0.32)], fill=(20, 100, 240, 255))
    for dx in (-0.1, 0, 0.1):
        d.ellipse([cx + size*dx - size*0.035, cy - size*0.03, cx + size*dx + size*0.035, cy + size*0.04], fill=(230, 245, 255, 255))
    for ang, length in [(-50, 0.12), (-35, 0.16), (-20, 0.12)]:
        rad = math.radians(ang)
        x1 = cx - size*0.22 + math.cos(rad) * size*0.05
        y1 = cy - size*0.18 + math.sin(rad) * size*0.05
        x2 = x1 + math.cos(rad) * size * length
        y2 = y1 + math.sin(rad) * size * length
        d.line([(x1, y1), (x2, y2)], fill=(40, 160, 255, 255), width=max(3, size//90))
    return img

logo = make_logo(1024, (0, 0, 0, 0))
logo.save('assets/logo.png')
logo.save('assets/icon.png')
logo.save('assets/adaptive-icon.png')
fg = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
l = logo.resize((720, 720), Image.Resampling.LANCZOS)
fg.paste(l, (152, 152), l)
fg.save('assets/android-icon-foreground.png')
Image.new('RGBA', (1024, 1024), (0, 0, 0, 255)).save('assets/android-icon-background.png')
splash = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
s = logo.resize((560, 560), Image.Resampling.LANCZOS)
splash.paste(s, (232, 232), s)
splash.save('assets/splash-icon.png')
print('icons generated')
