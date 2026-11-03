// Generate every logo variation from the traced master paths.
const { Resvg } = require('D:/Project/Unboring People/node_modules/@resvg/resvg-js');
const fs = require('fs');
const path = require('path');
const P = JSON.parse(fs.readFileSync('paths.json'));
const OUT = process.argv[2];
const INK = '#111111', LIME = '#B8F279', PAPER = '#F5F3EB';

// Geometry in the 4x trace space (source px * 4).
const PAD = 60;
const layouts = {
  // As drawn: UNBORING over PEOPLE.
  stacked: { box: [1256 - PAD, 512 - PAD, 6752 - 1256 + PAD * 2, 2304 - 512 + PAD * 2], people: '' },
  // One line: PEOPLE. (with its underline) moved up beside UNBORING, on the same baseline, one word-space apart.
  horizontal: { box: [1256 - PAD, 512 - PAD, 11068 - 1256 + PAD * 2, 1556 - 512 + PAD * 2], people: 'translate(5736 -748)' },
  // The smiley O on its own.
  mark: { box: [3374, 428, 1000, 1000], people: null },
};
const schemes = {
  'on-dark': { word: PAPER, people: LIME, mark: LIME, line: LIME },
  // Lime fails as a line on paper, so on light grounds it becomes a solid disc behind an ink smiley.
  'on-light': { word: INK, people: INK, mark: INK, line: INK, disc: LIME },
  'mono-ink': { word: INK, people: INK, mark: INK, line: INK },
  'mono-paper': { word: PAPER, people: PAPER, mark: PAPER, line: PAPER },
};
const markSchemes = { 'on-dark': LIME, 'on-light': INK, 'mono-ink': INK, 'mono-paper': PAPER };
// Filling the ring's outline with the default nonzero rule gives a solid disc the exact shape of the brush circle.
// The smiley path is stored once in <defs> and drawn with <use>, so the disc version costs no extra bytes.
const MARK_DEF = `<defs><path id="o" d="${P.mark}"/></defs>`;
const disc = (color) => (color ? `<use href="#o" fill="${color}"/>` : '');
const ring = (color) => `<use href="#o" fill-rule="evenodd" fill="${color}"/>`;

function svg(layout, scheme, bg) {
  const L = layouts[layout];
  const [x, y, w, h] = L.box;
  const c = schemes[scheme];
  const rect = bg ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}"/>` : '';
  const body =
    layout === 'mark'
      ? MARK_DEF + disc(c.disc) + ring(markSchemes[scheme])
      : `<path fill-rule="evenodd" fill="${c.word}" d="${P.white}"/>` +
        MARK_DEF + disc(c.disc) + ring(c.mark) +
        `<g${L.people ? ` transform="${L.people}"` : ''}><path fill-rule="evenodd" fill="${c.people}" d="${P.people}"/>` +
        `<path fill-rule="evenodd" fill="${c.line}" d="${P.line}"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="UNBORING PEOPLE"><title>UNBORING PEOPLE</title>${rect}${body}</svg>\n`;
}

function png(svgText, width) {
  return new Resvg(svgText, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

const files = [];
const write = (rel, data) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, data);
  files.push(rel);
};
const widths = { stacked: 4000, horizontal: 6000, mark: 2048 };

for (const layout of Object.keys(layouts)) {
  for (const scheme of Object.keys(schemes)) {
    const name = `unboring-people-${layout}-${scheme}`;
    const s = svg(layout, scheme);
    write(`SVG/${name}.svg`, s);
    write(`PNG/${name}.png`, png(s, widths[layout]));
  }
}
// Tiles with their background baked in, for decks, socials and anywhere transparency is a problem.
const tiles = [
  ['stacked', 'on-dark', INK], ['stacked', 'on-light', PAPER], ['stacked', 'mono-ink', LIME],
  ['horizontal', 'on-dark', INK], ['horizontal', 'mono-ink', LIME],
  ['mark', 'on-dark', INK], ['mark', 'mono-ink', LIME],
];
for (const [layout, scheme, bg] of tiles) {
  const bgName = { [INK]: 'ink', [PAPER]: 'paper', [LIME]: 'lime' }[bg];
  const name = `unboring-people-${layout}-${scheme}-on-${bgName}-background`.replace('on-dark-on-ink', 'on-ink').replace('on-light-on-paper', 'on-paper').replace('mono-ink-on-lime', 'on-lime').replace('on-light-on-lime', 'on-lime');
  const s = svg(layout, scheme, bg);
  write(`SVG/with-background/${name}.svg`, s);
  write(`PNG/with-background/${name}.png`, png(s, widths[layout]));
}

// Instagram / social avatar: the mark centred in an ink circle-safe square.
const m = layouts.mark.box;
const pad = 260;
const avatar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m[0] - pad} ${m[1] - pad} ${m[2] + pad * 2} ${m[3] + pad * 2}"><rect x="${m[0] - pad}" y="${m[1] - pad}" width="${m[2] + pad * 2}" height="${m[3] + pad * 2}" fill="${INK}"/><path fill-rule="evenodd" fill="${LIME}" d="${P.mark}"/></svg>\n`;
write('Social/unboring-people-avatar.svg', avatar);
write('Social/unboring-people-avatar-1080.png', png(avatar, 1080));
// Banner: stacked logo centred on ink, 1500x500 (X/LinkedIn header ratio).
const s0 = layouts.stacked.box;
const bw = s0[2] * 1.8, bh = bw / 3;
const banner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s0[0] + s0[2] / 2 - bw / 2} ${s0[1] + s0[3] / 2 - bh / 2} ${bw} ${bh}"><rect x="-99999" y="-99999" width="999999" height="999999" fill="${INK}"/><path fill-rule="evenodd" fill="${PAPER}" d="${P.white}"/><path fill-rule="evenodd" fill="${LIME}" d="${P.mark}"/><path fill-rule="evenodd" fill="${LIME}" d="${P.people}"/><path fill-rule="evenodd" fill="${LIME}" d="${P.line}"/></svg>\n`;
write('Social/unboring-people-banner-1500x500.png', png(banner, 1500));

fs.writeFileSync(path.join(OUT, '.files.json'), JSON.stringify(files, null, 1));
console.log(files.length, 'files');
