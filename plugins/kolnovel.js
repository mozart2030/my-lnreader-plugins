module.exports = {
  id: "kolnovel",
  name: "KolNovel",
  version: "1.1.16",
  icon: "https://kolnovel.com/favicon.ico",
  site: "https://kolnovel.com/",
  async popularNovels(page) {
    const url = `https://kolnovel.com/page/${page}/`;
    const body = await fetch(url).then(res => res.text());
    const loadedCheerio = cheerio.load(body);
    const novels = [];

    loadedCheerio(".post-title").each((_, element) => {
      const name = loadedCheerio(element).text().trim();
      const link = loadedCheerio(element).find("a").attr("href");
      novels.push({ name, url: link });
    });

    return novels;
  },

  async parseNovelAndChapters(novelUrl) {
    const body = await fetch(novelUrl).then(res => res.text());
    const loadedCheerio = cheerio.load(body);
    const name = loadedCheerio("h1").text().trim();
    const cover = loadedCheerio("img").first().attr("src");
    const summary = loadedCheerio(".summary").text().trim();
    const chapters = [];

    loadedCheerio(".chapter-list a").each((_, el) => {
      const chapterName = loadedCheerio(el).text().trim();
      const chapterUrl = loadedCheerio(el).attr("href");
      chapters.push({ name: chapterName, url: chapterUrl });
    });

    return { name, cover, summary, chapters };
  },

  async parseChapter(chapterUrl) {
    const body = await fetch(chapterUrl).then(res => res.text());
    const loadedCheerio = cheerio.load(body);
    const content = loadedCheerio(".entry-content").html();
    return content;
  }
};
