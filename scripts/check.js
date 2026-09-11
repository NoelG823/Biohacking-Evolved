const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const required = [
  'dist/index.html',
  'dist/assets/styles.css',
  'dist/assets/app.js',
  'dist/robots.txt',
  'wrangler.jsonc'
];

let failed = false;
for (const rel of required) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    console.error(`Missing required file: ${rel}`);
    failed = true;
  }
}

if (!failed) {
  const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'dist/assets/app.js'), 'utf8');
  const checks = [
    ['brand', html.includes('BIOHACKING. EVOLVED.')],
    ['stylesheet linked', html.includes('/assets/styles.css')],
    ['app linked', html.includes('/assets/app.js')],
    ['staging noindex', /noindex\s*,\s*nofollow/i.test(html)],
    ['launch readiness', html.includes('Launch Readiness') || js.includes('Launch Readiness')],
    ['editorial verification', html.includes('Editorial Verification') || js.includes('Editorial Verification')],
    ['community pulse', html.includes('Community Pulse') || js.includes('Community Pulse')],
    ['peptide index', html.includes('Peptide Index') || js.includes('Peptide Index')]
  ];
  for (const [name, ok] of checks) {
    if (!ok) {
      console.error(`Check failed: ${name}`);
      failed = true;
    }
  }
  try {
    new vm.Script(js, { filename: 'dist/assets/app.js' });
  } catch (err) {
    console.error('JavaScript syntax error:', err.message);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Production package checks passed.');
