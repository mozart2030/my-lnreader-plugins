/**
 * KolNovel plugin for LNReader
 * Author: Mozart
 */

const KolNovel = {
  id: "kolnovel",
  name: "KolNovel",
  version: 1,
  site: "https://kolnovel.com/",
  lang: "ar",
  icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
  author: "Mozart",
  hasUpdate: false,
  hasSearch: true,

  async search(query) {
    // implement search logic...
    return [];
  },

  async popular(page) {
    // optionally implement...
    return [];
  },

  async parseNovel(url) {
    // logic...
    return { name: "", cover: "", url, chapters: [] };
  },

  async parseChapter(url) {
    // logic...
    return { name: "", content: "" };
  }
};

export default KolNovel;
