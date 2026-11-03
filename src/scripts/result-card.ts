/**
 * Draws the shareable Boring Score card: 1080×1350 (Instagram portrait), black, lime, giant score.
 * Everything is drawn in the browser. Nothing is uploaded anywhere.
 */
const W = 1080;
const H = 1350;
const PAD = 80;

const C = { ink: '#111111', lime: '#B8F279', paper: '#F5F3EB', grey: '#9A9A9A' };
const DISPLAY = '"Archivo Black", "Arial Black", Impact, sans-serif';
const LABEL = '"Space Grotesk", ui-monospace, monospace';

export interface CardInput {
  score: number;
  title: string;
  handle?: string;
}

/** Waits for the brand fonts so the canvas never falls back to Arial. */
async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load(`400 100px "Archivo Black"`),
      document.fonts.load(`700 40px "Space Grotesk"`),
      document.fonts.load(`500 40px "Space Grotesk"`),
    ]);
  } catch {
    /* draw with fallbacks */
  }
}

/** Splits text into lines that fit maxWidth at the current font. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Shrinks a font until text fits on one line. */
function fit(ctx: CanvasRenderingContext2D, text: string, family: string, start: number, maxWidth: number, weight = '400') {
  let size = start;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 20) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

export async function drawCard(canvas: HTMLCanvasElement, { score, title, handle }: CardInput) {
  await fontsReady();
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'alphabetic';

  // Ground
  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 0, W, H);

  // Top row: wordmark + label
  ctx.fillStyle = C.paper;
  ctx.font = `400 46px ${DISPLAY}`;
  ctx.fillText('UNBORING', PAD, PAD + 40);
  ctx.fillText('PEOPLE', PAD, PAD + 88);

  ctx.font = `700 28px ${LABEL}`;
  ctx.textAlign = 'right';
  ctx.fillStyle = C.lime;
  ctx.fillText('THE BORING TEST', W - PAD, PAD + 36);
  ctx.textAlign = 'left';

  // Rule
  ctx.fillStyle = C.paper;
  ctx.fillRect(PAD, 230, W - PAD * 2, 6);

  // "My Boring Score"
  const who = handle ? `${handle.toUpperCase()}'S BORING SCORE` : 'MY BORING SCORE';
  fit(ctx, who, LABEL, 34, W - PAD * 2, '700');
  ctx.fillStyle = C.lime;
  ctx.fillText(who, PAD, 310);

  // Giant score. "10" is two digits wide, so it shrinks to leave room for "/10".
  const scoreText = String(score);
  fit(ctx, scoreText, DISPLAY, 600, W - PAD * 2 - 340);
  ctx.fillStyle = C.lime;
  const scoreW = ctx.measureText(scoreText).width;
  const scoreBase = 830;
  ctx.fillText(scoreText, PAD - 18, scoreBase);

  ctx.font = `400 150px ${DISPLAY}`;
  ctx.fillStyle = C.paper;
  ctx.fillText('/10', PAD - 18 + scoreW + 16, scoreBase);

  // Verdict
  ctx.fillStyle = C.paper;
  // Wrap onto at most two lines at full size; shrink only if it still doesn't fit.
  let verdictSize = 96;
  let lines: string[];
  for (;;) {
    ctx.font = `400 ${verdictSize}px ${DISPLAY}`;
    lines = wrap(ctx, title.toUpperCase(), W - PAD * 2);
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    if ((lines.length <= 2 && widest <= W - PAD * 2) || verdictSize <= 40) break;
    verdictSize -= 6;
  }
  lines.slice(0, 2).forEach((l, i) => ctx.fillText(l, PAD, 950 + i * verdictSize * 0.95));

  // Footnote
  ctx.font = `500 26px ${LABEL}`;
  ctx.fillStyle = C.grey;
  ctx.fillText('A playful score, not a scientific one.', PAD, 1110);

  // Lime call to action bar
  ctx.fillStyle = C.lime;
  ctx.fillRect(0, H - 170, W, 170);
  ctx.fillStyle = C.ink;
  ctx.font = `400 50px ${DISPLAY}`;
  ctx.fillText('HOW BORING IS YOURS?', PAD, H - 92);
  ctx.font = `700 32px ${LABEL}`;
  ctx.fillText('unboringpeople.com/test', PAD, H - 46);

  // The "!?" mark, bottom right of the bar
  const r = 58;
  const cx = W - PAD - r;
  const cy = H - 85;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = C.ink;
  ctx.fill();
  ctx.fillStyle = C.lime;
  ctx.font = `400 50px ${DISPLAY}`;
  ctx.textAlign = 'center';
  ctx.fillText('!?', cx, cy + 18);
  ctx.textAlign = 'left';
}

export function cardBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
}
