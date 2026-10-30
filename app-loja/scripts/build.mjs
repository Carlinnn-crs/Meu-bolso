// Empacota src/native.js (plugins do Capacitor) em www/native.js
import { build } from 'esbuild';
await build({
  entryPoints: ['src/native.js'],
  bundle: true,
  format: 'iife',
  target: ['safari15', 'chrome90'],
  outfile: 'www/native.js',
  minify: true,
  legalComments: 'none',
});
console.log('✓ www/native.js gerado');
