// Generates the social preview card and app icons into /public.
// Run with `npm run generate:social` after changing the brand, copy or hero photo.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const out = (file) => fileURLToPath(new URL(`public/${file}`, root));
const asset = (file) => fileURLToPath(new URL(`src/assets/images/${file}`, root));

const colors = {
  canvas: '#0a0a0b',
  fg: '#ededea',
  muted: '#a1a1a6',
  subtle: '#7d7d85',
  accent: '#f5d133',
};

const sans = 'Arial, Helvetica, sans-serif';
const mono = 'Consolas, Menlo, monospace';

/** The brand key mark, drawn on a 24-unit grid. */
const keyMark = (x, y, scale, stroke = colors.accent) => `
  <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="7.5" cy="12" r="4" />
    <path d="M11.5 12h10M18.5 12v3M15.5 12v2" />
  </g>`;

async function socialCard() {
  const width = 1200;
  const height = 630;
  const photoWidth = 470;
  const photoLeft = width - photoWidth;

  const photo = await sharp(asset('hero-technician.jpg'))
    .resize(photoWidth, height, { fit: 'cover', position: 'attention' })
    .grayscale()
    .modulate({ brightness: 0.85 })
    .toBuffer();

  const overlay = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="${colors.canvas}" />
        <stop offset="1" stop-color="${colors.canvas}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect x="${photoLeft - 1}" y="0" width="160" height="${height}" fill="url(#fade)" />

    ${keyMark(72, 62, 1.5)}
    <text x="118" y="91" font-family="${sans}" font-weight="700" font-size="30" fill="${colors.fg}" letter-spacing="-0.5">Arrieta</text>
    <line x1="242" y1="70" x2="242" y2="96" stroke="#2a2a2e" stroke-width="2" />
    <text x="256" y="90" font-family="${mono}" font-size="18" fill="${colors.subtle}">24H</text>

    <line x1="72" y1="212" x2="104" y2="212" stroke="${colors.accent}" stroke-width="2" />
    <text x="118" y="218" font-family="${mono}" font-size="20" fill="${colors.muted}" letter-spacing="1.5">CERRAJERÍA 24 HORAS · COSTA RICA</text>

    <text x="68" y="318" font-family="${sans}" font-weight="700" font-size="66" fill="${colors.fg}" letter-spacing="-2.5">Abrimos su puerta.</text>
    <text x="68" y="394" font-family="${sans}" font-weight="700" font-size="66" fill="${colors.muted}" letter-spacing="-2.5">A cualquier hora.</text>

    <text x="72" y="456" font-family="${sans}" font-size="25" fill="${colors.muted}">A domicilio en toda la GAM · resto del país con cita</text>

    <rect x="72" y="500" width="352" height="64" rx="32" fill="${colors.accent}" />
    <text x="104" y="541" font-family="${sans}" font-weight="700" font-size="27" fill="${colors.canvas}">WhatsApp · 7204 1289</text>

    <rect x="${photoLeft + 28}" y="${height - 72}" width="260" height="40" rx="20" fill="${colors.canvas}" fill-opacity="0.82" />
    <circle cx="${photoLeft + 50}" cy="${height - 52}" r="5" fill="${colors.accent}" />
    <text x="${photoLeft + 66}" y="${height - 46}" font-family="${mono}" font-size="16" fill="${colors.fg}" letter-spacing="1">+40 AÑOS · 24/7</text>
  </svg>`;

  await sharp({ create: { width, height, channels: 3, background: colors.canvas } })
    .composite([
      { input: photo, left: photoLeft, top: 0 },
      { input: Buffer.from(overlay), left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out('og-image.jpg'));
}

async function appIcon(size, file) {
  const scale = (size * 0.56) / 24;
  const offset = (size - 24 * scale) / 2;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${colors.canvas}" />
    ${keyMark(offset - scale, offset, scale)}
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out(file));
}

await socialCard();
await appIcon(180, 'apple-touch-icon.png');
await appIcon(192, 'icon-192.png');
await appIcon(512, 'icon-512.png');
console.log('Social card and icons written to /public');
