#!/usr/bin/env python3
from PIL import Image, ImageDraw
from pathlib import Path
import base64, io, os, math

os.makedirs("assets", exist_ok=True)

def load_logo():
    parts = sorted(Path("scripts").glob("logo_exact.b64.p*"))
    if parts:
        b64 = "".join(p.read_text().strip() for p in parts)
        return Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGBA")
    single = Path("scripts/logo_exact.b64")
    if single.exists():
        return Image.open(io.BytesIO(base64.b64decode(single.read_text().strip()))).convert("RGBA")
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2 + 20
    for i, w in enumerate([28, 18, 10]):
        d.arc([cx - 420 + i * 10, cy - 280, cx + 420 - i * 10, cy + 320], 200, 40, fill=(40, 140, 255, 220), width=w)
        d.arc([cx - 400, cy - 260, cx + 400, cy + 300], -40, 160, fill=(80, 180, 255, 180), width=16)
    d.ellipse([cx - 280, cy - 220, cx + 300, cy + 160], fill=(20, 100, 255, 255))
    d.ellipse([cx - 180, cy - 180, cx + 40, cy - 20], fill=(120, 200, 255, 100))
    d.polygon([(cx - 120, cy + 120), (cx - 20, cy + 120), (cx - 180, cy + 280)], fill=(15, 90, 240, 255))
    for dx in (-100, 0, 100):
        d.ellipse([cx + dx - 36, cy - 30, cx + dx + 36, cy + 42], fill=(235, 245, 255, 255))
        d.ellipse([cx + dx - 20, cy - 20, cx + dx + 12, cy + 12], fill=(255, 255, 255, 180))
    for ang, length in [(-55, 120), (-38, 160), (-22, 120)]:
        rad = math.radians(ang)
        x1 = cx - 220 + math.cos(rad) * 40
        y1 = cy - 160 + math.sin(rad) * 40
        x2 = x1 + math.cos(rad) * length
        y2 = y1 + math.sin(rad) * length
        d.line([(x1, y1), (x2, y2)], fill=(50, 170, 255, 255), width=22)
        d.line([(x1, y1), (x2, y2)], fill=(100, 200, 255, 200), width=10)
    return img

im = load_logo()
im.save("assets/logo.png")
w, h = im.size
s = min(w, h)
sq = im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((1024, 1024), Image.Resampling.LANCZOS)
sq.save("assets/icon.png")
sq.save("assets/adaptive-icon.png")
fg = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
logo = sq.resize((800, 800), Image.Resampling.LANCZOS)
fg.paste(logo, (112, 112), logo)
fg.save("assets/android-icon-foreground.png")
Image.new("RGBA", (1024, 1024), (0, 0, 0, 255)).save("assets/android-icon-background.png")
splash = Image.new("RGBA", (1024, 1024), (255, 255, 255, 255))
lw, lh = 700, max(1, int(700 * h / w))
l = im.resize((lw, lh), Image.Resampling.LANCZOS)
splash.paste(l, ((1024 - lw) // 2, (1024 - lh) // 2), l)
splash.save("assets/splash-icon.png")
print("icons ready", w, h)
