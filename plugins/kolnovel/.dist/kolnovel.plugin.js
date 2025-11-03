/**
 * KolNovel Plugin for LNReader
 * Author: Mozart
 * Language: Arabic (ar)
 * Website: https://kolnovel.com
 */

function KolNovel() {
  const baseUrl = "https://kolnovel.com";

  return {
    id: "kolnovel",
    name: "KolNovel",
    version: 1,
    icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
    site: baseUrl,
    lang: "ar",
    author: "Mozart",
    hasSearch: true,
    hasUpdate: false,

    /**
     * Search novels by query
     */
    async search(query) {
      const url = `${baseUrl}/?s=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html, "text/html");

      const results = [];
      dom.querySelectorAll(".post-title a").forEach(a => {
        results.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
        });
      });
      return results;
    },

    /**
     * Get popular novels (optional)
     */
    async popular(page = 1) {
      const url = `${baseUrl}/page/${page}/`;
      const res = await fetch(url);
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html, "text/html");

      const novels = [];
      dom.querySelectorAll(".post-title a").forEach(a => {
        novels.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
        });
      });
      return novels;
    },

    /**
     * Parse a novel page to extract chapters
     */
    async parseNovel(url) {
      const res = await fetch(url);
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html, "text/html");

      const title = dom.querySelector("h1")?.textContent?.trim() || "Unknown";
      const cover = dom.querySelector(".wp-post-image")?.src || "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png";

      const chapters = [];
      dom.querySelectorAll(".chapter-title a").forEach(a => {
        chapters.push({
          name: a.textContent.trim(),
          url: a.href,
        });
      });

      return {
        name: title,
        cover,
        chapters,
      };
    },

    /**
     * Parse a chapter page
     */
    async parseChapter(url) {
      const res = await fetch(url);
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html, "text/html");

      const title = dom.querySelector("h1")?.textContent?.trim() || "No title";
      const content = dom.querySelector(".entry-content")?.innerHTML || "No content";

      return {
        name: title,
        content,
      };
    },
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = KolNovel();
}
