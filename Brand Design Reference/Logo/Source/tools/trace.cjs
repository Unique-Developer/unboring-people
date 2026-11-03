// Trace each 4x mask into an SVG path. Coordinates stay in the 8000x2668 (4x) space.
const potrace = require('potrace');
const fs = require('fs');
const parts = ['white', 'people', 'mark', 'line'];
const base = { turdSize: 40, optCurve: true, threshold: 128, blackOnWhite: true };
const optsFor = (p) => (p === 'white' || p === 'people' ? { ...base, alphaMax: 0.95, optTolerance: 1.2 } : { ...base, alphaMax: 1.0, optTolerance: 0.3 });
(async () => {
  const out = {};
  for (const p of parts) {
    const svg = await new Promise((res, rej) => potrace.trace(`mask_${p}.png`, optsFor(p), (e, s) => (e ? rej(e) : res(s))));
    const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
    // Round coordinates to whole 4x-pixels: invisible at any size, much smaller file.
    out[p] = d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n))));
    console.log(p, out[p].length, 'chars');
  }
  fs.writeFileSync('paths.json', JSON.stringify(out));
})();
