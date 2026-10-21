// Builds a self-contained copy for sharing as a claude.ai Artifact: relative asset paths,
// and an artifact.html page without <html>/<head>/<body> (the host adds the skeleton).
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

execSync('npx vite build --base ./ --outDir dist-artifact --emptyOutDir', { stdio: 'inherit' });
const html = readFileSync('dist-artifact/index.html', 'utf8');
const assets = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="\.\/(assets\/[^"]+)"[^>]*>(?:<\/script>)?/g)].map((m) => m[0]);
const page = `<title>Mochi Home</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>html,body{height:100%;margin:0;background:#2a1d4f;color-scheme:dark}</style>
${assets.join('\n')}
<div id="app"></div>
<div id="overlay"></div>
`;
writeFileSync('dist-artifact/artifact.html', page);
console.log('artifact.html written; files:', readdirSync('dist-artifact/assets').length);
