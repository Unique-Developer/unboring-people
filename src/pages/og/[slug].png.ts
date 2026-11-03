/**
 * Open Graph / Twitter images, generated at build time: /og/<slug>.png, 1200×630.
 * Satori lays out the card, resvg turns it into a PNG. Text stays real text in the page; these are only previews.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const ogPages = {
  home: { label: 'Creative growth agency / Surat + New Jersey', title: 'We make brands impossible to ignore.' },
  services: { label: 'Services', title: 'Five ways to stop being ignored.' },
  lab: { label: 'The Unboring Lab', title: 'Ideas you can steal.' },
  test: { label: 'The Boring Test', title: 'How boring is your brand?' },
  founding: { label: 'Founding seats', title: "Three seats. That's it." },
  manifesto: { label: 'Manifesto', title: 'Ordinary is not our thing.' },
  talk: { label: 'Talk to us', title: "Tell us what's boring." },
} as const;

type Slug = keyof typeof ogPages;

export const getStaticPaths: GetStaticPaths = () => Object.keys(ogPages).map((slug) => ({ params: { slug } }));

const font = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    font('archivo-black', 'archivo-black-latin-400-normal.woff').then((data) => ({ name: 'Archivo Black', data, weight: 400 as const, style: 'normal' as const })),
    font('space-grotesk', 'space-grotesk-latin-700-normal.woff').then((data) => ({ name: 'Space Grotesk', data, weight: 700 as const, style: 'normal' as const })),
  ]));

const INK = '#111111';
const LIME = '#B8F279';
const PAPER = '#F5F3EB';

// The real logo artwork, rasterised once and embedded as a PNG data URI.
const LOGO_W = 300;
let logo: Promise<string> | undefined;
const logoDataUri = () =>
  (logo ??= readFile(join(process.cwd(), 'public', 'brand', 'logo-stacked-on-dark.svg'), 'utf8').then((svg) => {
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: LOGO_W * 2 } }).render().asPng();
    return `data:image/png;base64,${Buffer.from(png).toString('base64')}`;
  }));

// Tiny element helper so the layout reads like markup.
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ params }) => {
  const { label, title } = ogPages[params.slug as Slug];
  const size = title.length > 30 ? 74 : 92;

  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: INK, color: PAPER, position: 'relative' }, [
    // Big lime "!?" disc, bleeding off the right edge.
    h('div', {
      position: 'absolute', right: -200, top: 110, width: 440, height: 440, borderRadius: 999, background: LIME,
      display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 40, fontFamily: 'Archivo Black', fontSize: 150, color: INK,
    }, '!?'),
    // Top row: the logo
    h('div', { display: 'flex', padding: '48px 56px 0' }, [
      { type: 'img', props: { src: await logoDataUri(), width: LOGO_W, height: Math.round((LOGO_W * 1912) / 5616) } },
    ]),
    // Title
    h('div', { display: 'flex', flexDirection: 'column', padding: '0 64px', marginTop: 'auto', marginBottom: 40, maxWidth: 900 }, [
      h('div', { fontFamily: 'Space Grotesk', fontSize: 24, letterSpacing: 2, color: LIME, marginBottom: 20 }, label.toUpperCase()),
      h('div', { fontFamily: 'Archivo Black', fontSize: size, lineHeight: 0.9, letterSpacing: -2 }, title.toUpperCase()),
    ]),
    // Bottom bar
    h('div', {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 84, padding: '0 64px',
      background: LIME, color: INK, fontFamily: 'Space Grotesk', fontSize: 28,
    }, [h('span', {}, 'unboringpeople.com'), h('span', { fontFamily: 'Archivo Black', fontSize: 30 }, 'MAKE BORING BRANDS UNFORGETTABLE.')]),
  ]);

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
