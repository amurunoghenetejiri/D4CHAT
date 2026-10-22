#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os
os.makedirs('assets', exist_ok=True)
def lerp(a, b, t):
    return int(a + (b - a) * t)
def gradient_color(t):
    if t < 0.5:
        t2 = t * 2
        return (lerp(0, 59, t2), lerp(229, 130, t2), lerp(255, 246, t2))
    t2 = (t - 0.5) * 2
    return (lerp(59, 76, t2), lerp(130, 29, t2), lerp(246, 149, t2))
size = 1024
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
mask = Image.new('L', (size, size), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=220, fill=255)
grad = Image.new('RGBA', (size, size))
gd = ImageDraw.Draw(grad)
for y in range(size):
    c = gradient_color(y / (size - 1))
    gd.line([(0, y), (size, y)], fill=c + (255,))
img = Image.composite(grad, img, mask)
draw = ImageDraw.Draw(img)
draw.rounded_rectangle([200, 260, 800, 640], radius=80, fill=(255, 255, 255, 255))
draw.polygon([(280, 620), (340, 620), (260, 740)], fill=(255, 255, 255, 255))
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 220)
except Exception:
    font = ImageFont.load_default()
text = 'd4'
bbox = draw.textbbox((0, 0), text, font=font)
tw = bbox[2] - bbox[0]
draw.text(((size - tw) // 2, 320), text, font=font, fill=(76, 29, 149, 255))
draw.ellipse([640, 180, 820, 360], fill=(255, 255, 255, 230))
draw.ellipse([700, 230, 760, 290], fill=(59, 130, 246, 255))
img.save('assets/icon.png')
img.save('assets/adaptive-icon.png')
fg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
content = img.resize((720, 720), Image.Resampling.LANCZOS)
fg.paste(content, (152, 152), content)
fg.save('assets/android-icon-foreground.png')
bg = Image.new('RGBA', (size, size))
bd = ImageDraw.Draw(bg)
for y in range(size):
    c = gradient_color(y / (size - 1))
    bd.line([(0, y), (size, y)], fill=c + (255,))
bg.save('assets/android-icon-background.png')
splash = Image.new('RGBA', (size, size), (255, 255, 255, 255))
logo = img.resize((512, 512), Image.Resampling.LANCZOS)
splash.paste(logo, (256, 256), logo)
splash.save('assets/splash-icon.png')
print('icons ok')
