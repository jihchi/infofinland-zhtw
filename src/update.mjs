#!/usr/bin/env zx
import 'zx/globals';
import cheerio from 'cheerio';

const dir = {
  public: (...paths) => path.join(__dirname, '../public', ...paths),
  hatchfull: (...paths) => path.join(__dirname, '../HatchfulExport-All', ...paths),
}

console.log(chalk.blue('Updating', chalk.bold('index.html'), '...'));
const indexHtml = dir.public('index.html');
const googleAnalytics = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X99K2F7GS8"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-X99K2F7GS8');
</script>`;

const $$ = cheerio.load(await fs.readFile(indexHtml, 'utf8'));

$$('title').html("InfoFinland 中文台灣");
$$('meta[property="og:title"]').attr('content', 'InfoFinland 中文台灣');
$$('meta[property="og:type"]').attr('content', 'website');
$$('meta[property="og:url"]').attr('content', 'https://infofinland.tw');
$$('meta[property="og:image"]').attr('content', 'https://infofinland.tw/assets/twitter_header_photo_1_1641713421419_0.png');
$$('meta[property="og:description"]').attr('content', '提供🇫🇮芬蘭相關資訊');
$$('meta[property="og:site_name"]').attr('content', 'InfoFinland 中文台灣');
$$('head').add('script').html(googleAnalytics);

await fs.outputFile(indexHtml, $$.html());

console.log(chalk.blue('Update', chalk.bold('favicon'), '...'));
await $`cp -f ${dir.hatchfull('favicon.png')} ${dir.public('static/img/logo.png')}`;
