# Split the logo into colour layers, separate the lime layer into its parts, and upscale each mask 4x for tracing.
import sys
from collections import deque
from PIL import Image, ImageFilter
SP = sys.argv[1]
im = Image.open(f'{SP}/source.webp').convert('RGB')
W, H = im.size
px = im.load()

def soft(fn):
    m = Image.new('L', (W, H))
    mp = m.load()
    for y in range(H):
        for x in range(W):
            mp[x, y] = fn(*px[x, y])
    return m

clamp = lambda v: max(0, min(255, int(v)))
# Whiteness: bright and neutral. Limeness: green well above blue.
white = soft(lambda r, g, b: clamp((min(r, g, b) - 60) * 255 / 160) if abs(r - b) < 60 else 0)
lime = soft(lambda r, g, b: clamp((g - b - 40) * 255 / 120) if g > 60 else 0)

# Connected components on the binary lime layer to tell circle, PEOPLE and underline apart.
lb = lime.point(lambda v: 255 if v > 90 else 0)
lp = lb.load()
label = {}
comps = []
for y in range(H):
    for x in range(W):
        if lp[x, y] and (x, y) not in label:
            q = deque([(x, y)]); label[(x, y)] = len(comps); pts = []
            while q:
                cx, cy = q.popleft(); pts.append((cx, cy))
                for nx, ny in ((cx+1,cy),(cx-1,cy),(cx,cy+1),(cx,cy-1),(cx+1,cy+1),(cx-1,cy-1),(cx+1,cy-1),(cx-1,cy+1)):
                    if 0 <= nx < W and 0 <= ny < H and lp[nx, ny] and (nx, ny) not in label:
                        label[(nx, ny)] = len(comps); q.append((nx, ny))
            xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
            comps.append((len(pts), min(xs), min(ys), max(xs), max(ys)))
big = [(i, c) for i, c in enumerate(comps) if c[0] > 30]
for i, c in big: print(i, c)

def part_of(c):
    n, x0, y0, x1, y1 = c
    if y1 < 345 or (y0 < 300 and x0 > 800 and x1 < 1150): return 'mark'      # circle + smiley
    if y0 > 495: return 'line'                                               # underline swooshes
    return 'people'

assign = {i: part_of(c) for i, c in enumerate(comps)}
parts = {k: Image.new('L', (W, H)) for k in ('mark', 'line', 'people')}
pp = {k: v.load() for k, v in parts.items()}
lsoft = lime.load()
# Give every soft lime pixel to the part of its nearest labelled neighbour (within 3px), so edges keep their antialiasing.
for y in range(H):
    for x in range(W):
        v = lsoft[x, y]
        if not v: continue
        k = None
        for r in range(0, 4):
            for dx in range(-r, r + 1):
                for dy in (-r, r) if r else (0,):
                    j = label.get((x + dx, y + dy))
                    if j is not None and comps[j][0] > 30: k = assign[j]; break
                if k: break
            if k: break
        if k: pp[k][x, y] = v

def export(m, name, blur):
    up = m.resize((W * 4, H * 4), Image.LANCZOS).filter(ImageFilter.GaussianBlur(blur))
    # potrace traces dark shapes: ink = black on white.
    up.point(lambda v: 0 if v > 127 else 255).save(f'{SP}/mask_{name}.png')

# Letters are clean geometric shapes: smooth harder. Brush marks keep their texture.
export(white, 'white', 3.2)
export(parts['people'], 'people', 3.2)
export(parts['mark'], 'mark', 1.4)
export(parts['line'], 'line', 1.4)
print('done')
