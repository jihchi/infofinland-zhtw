import fs from 'node:fs';
import cheerio from 'cheerio';

const { html: outerHtml } = cheerio.default;
const INDEX_HTML = '../public/index.html';
const indexHtml = fs.readFileSync(new URL(INDEX_HTML, import.meta.url));
const $ = cheerio.load(indexHtml);

// assets/favicon_1641713690172_0.png
$('title').html("InfoFinland 中文台灣");
$('meta[property="og:title"]').attr('content', 'InfoFinland 中文台灣');
$('meta[property="og:type"]').attr('content', 'website');
$('meta[property="og:url"]').attr('content', 'https://infofinland.tw');
$('meta[property="og:image"]').attr('content', 'https://infofinland.tw/assets/twitter_header_photo_1_1641713421419_0.png');

console.log(outerHtml($('meta')));

