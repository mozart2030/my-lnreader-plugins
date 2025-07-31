import { Plugin, PluginSearch, PluginContent } from '@lnreader/core';

const BASE_URL = 'https://kolnovel.com';

const headers = {
  'User-Agent': 'Mozilla/5.0',
  'Referer': BASE_URL,
};

/** البحث */
const searchNovels: PluginSearch['searchNovels'] = async (searchTerm) => {
  const url = `${BASE_URL}/?s=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(url, { headers });
  const html = await response.text();

  const $ = cheerio.load(html);
  const results = [];

  $('.post-title a').each((_, el) => {
    const novelName = $(el).text().trim();
    const novelUrl = $(el).attr('href');
    if (novelName && novelUrl) {
      results.push({
        name: novelName,
        url: novelUrl,
        cover: null,
      });
    }
  });

  return results;
};

/** تفاصيل الرواية والفصول */
const parseNovelAndChapters: PluginContent['parseNovelAndChapters'] = async (novelUrl) => {
  const response = await fetch(novelUrl, { headers });
  const html = await response.text();
  const $ = cheerio.load(html);

  const name = $('h1').first().text().trim();
  const cover = $('figure img').attr('src') || null;
  const summary = $('.entry-content p').first().text().trim();

  const chapters = [];
  $('.su-button-center a').each((_, el) => {
    const chapterName = $(el).text().trim();
    const chapterUrl = $(el).attr('href');
    if (chapterUrl) {
      chapters.push({ name: chapterName, url: chapterUrl, releaseTime: null });
    }
  });

  return { name, cover, summary, chapters };
};

/** محتوى الفصل */
const parseChapter: PluginContent['parseChapter'] = async (chapterUrl) => {
  const response = await fetch(chapterUrl, { headers });
  const html = await response.text();
  const $ = cheerio.load(html);

  const chapterText = $('.entry-content').html();
  return chapterText || '';
};

/** التصدير النهائي */
const plugin: Plugin = {
  id: 'kolnovel',
  name: 'KolNovel',
  version: '1.0.0',
  icon: '🌐',
  site: BASE_URL,
  content: {
    parseNovelAndChapters,
    parseChapter,
  },
  search: {
    searchNovels,
  },
};

export default plugin;
