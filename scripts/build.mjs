import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

const minifyCss = (css) =>
  css
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();

await mkdir('dist', { recursive: true });

await build({
  entryPoints: ['main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  target: ['es2020'],
  minify: true,
  sourcemap: false,
});

const css = await readFile('src/styles/main.css', 'utf8');
await writeFile('dist/styles.css', minifyCss(css), 'utf8');

await cp('assets', 'dist/assets', { recursive: true });
await cp('index.html', 'dist/index.html');

const html = await readFile('dist/index.html', 'utf8');
await writeFile('dist/index.html', html.replace(/dist\//g, ''), 'utf8');

console.log('Build completed: dist/');
