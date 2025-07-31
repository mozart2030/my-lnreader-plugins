const cheerio = require('cheerio');
const BASE_URL = 'https://kolnovel.site'; // استخدم النطاق الأحدث

module.exports = {
  id: "kolnovel",
  name: "KolNovel",
  version: "1.2.0",
  icon: "https://kolnovel.site/favicon.ico",
  site: BASE_URL,

  async popularNovels(page = 1) {
    const res = await fetch(`${BASE_URL}/page/${page}/`);
    const body = await res.text();
    const $ = cheerio.load(body);
    return $('.post-title a').map((_, el) => ({
      name: $(el).text().trim(),
      url: $(el).attr('href'),
    })).get();
  },

  async parseNovelAndChapters(novelUrl) {
    const res = await fetch(novelUrl);
    const body = await res.text();
    const $ = cheerio.load(body);

    const name = $('h1').first().text().trim();
    const cover = $('img').first().attr('src') || null;
    const summary = $('.entry-content p').first().text().trim();
    const chapters = $('.su-button-center a').map((_, el) => ({
      name: $(el).text().trim(),
      url: $(el).attr('href'),
    })).get();

    return { name, cover, summary, chapters };
  },

  async parseChapter(chapterUrl) {
    const res = await fetch(chapterUrl);
    const body = await res.text();
    const $ = cheerio.load(body);
    return $('.entry-content').html() || '';
  }
};
