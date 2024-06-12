import { build } from 'esbuild';

build({
  entryPoints: ['src/server.jsx'],
  outfile: 'dist/server.cjs',
  bundle: true,
  minify: true,
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  external: ['./node_modules/*'],
}).catch(() => process.exit(1));

build({
  entryPoints: ['src/client.jsx'],
  outfile: 'dist/client.js',
  bundle: true,
  minify: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
}).catch(() => process.exit(1));
