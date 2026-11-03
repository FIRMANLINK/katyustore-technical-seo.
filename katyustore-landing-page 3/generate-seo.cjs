/**
 * KATYUSTORE - Technical SEO generator
 * Author of project: Firman Hadiyansyah (240102034)
 *
 * Manual:
 *   node generate-seo.cjs https://situs-kamu.netlify.app
 *   node generate-seo.cjs https://username.github.io/nama-repo/
 *
 * Git-connected Netlify: otomatis menggunakan SITE_URL atau URL dari Netlify.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const folder = __dirname;
const input = process.argv[2] || process.env.SITE_URL || process.env.URL;

if (!input) {
  console.error('URL publik belum ditentukan.');
  console.error('Jalankan: node generate-seo.cjs https://alamat-website-kamu.netlify.app');
  process.exit(1);
}

let siteBase;
try {
  const url = new URL(input.trim());
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('Gunakan URL HTTPS tanpa username, password, query, atau fragment.');
  }
  if (/^(localhost|127\.0\.0\.1)$/i.test(url.hostname) || /\.(example|invalid|test)$/i.test(url.hostname)) {
    throw new Error('Domain contoh atau lokal tidak dapat dipakai untuk sitemap publik.');
  }
  if (url.pathname.includes('//') || /\.(html?|xml)$/i.test(url.pathname)) {
    throw new Error('Masukkan URL folder/beranda website, bukan file HTML/XML.');
  }
  // URL root Netlify atau path repository GitHub Pages: akhiri dengan satu slash.
  siteBase = url.origin + url.pathname.replace(/\/*$/, '/') ;
} catch (error) {
  console.error('URL tidak valid:', error.message);
  process.exit(1);
}

const esc = (str) => str.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${esc(siteBase)}</loc>\n  </url>\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteBase}sitemap.xml\n`;

fs.writeFileSync(path.join(folder, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(folder, 'robots.txt'), robots, 'utf8');

const htmlFile = path.join(folder, 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');
// Jangan menumpuk tag canonical walaupun script dijalankan berulang.
html = html.replace(/^\s*<link\s+rel=["']canonical["'][^>]*>\s*\r?\n/gim, '\n');
const canonical = `  <link rel="canonical" href="${esc(siteBase)}">`;
if (/<meta\s+name=["']viewport["'][^>]*>/i.test(html)) {
  html = html.replace(/(<meta\s+name=["']viewport["'][^>]*>)/i, `$1\n${canonical}`);
} else {
  html = html.replace(/<\/head>/i, `${canonical}\n</head>`);
}
fs.writeFileSync(htmlFile, html, 'utf8');
console.log('SEO berhasil dikonfigurasi untuk:', siteBase);
console.log('  Robots: ', `${siteBase}robots.txt`);
console.log('  Sitemap:', `${siteBase}sitemap.xml`);
console.log('  Halaman: ', siteBase);
