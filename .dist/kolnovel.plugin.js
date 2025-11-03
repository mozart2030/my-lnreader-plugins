const baseUrl = "https://kolnovel.com";

const plugin = {
  id: "kolnovel",
  name: "KolNovel",
  version: "1.1.20",
  icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
  site: baseUrl,
  lang: "ar",
  author: "Mozart",
  hasSearch: true,
  hasUpdate: false,

  async popular(page) {
    try {
      const res = await fetch(`${baseUrl}/page/${page || 1}/`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const novels = [];
      doc.querySelectorAll(".post-title a").forEach(a => {
        novels.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: this.icon
        });
      });
      return novels;
    } catch (e) {
      console.error(e); return [];
    }
  },

  async search(query) {
    try {
      const res = await fetch(`${baseUrl}/?s=${encodeURIComponent(query)}`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const novels = [];
      doc.querySelectorAll(".post-title a").forEach(a => {
        novels.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: this.icon
        });
      });
      return novels;
    } catch (e) {
      console.error(e); return [];
    }
  },

  async parseNovel(novelUrl) {
    try {
      const res = await fetch(novelUrl);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title = doc.querySelector("h1")?.textContent.trim() || "بدون عنوان";
      const chapters = [];
      doc.querySelectorAll(".entry-content a[href*='kolnovel.com']").forEach(a => {
        chapters.push({ name: a.textContent.trim(), url: a.href });
      });
      return { name: title, cover: this.icon, chapters: chapters.reverse() };
    } catch (e) {
      console.error(e); return { name: "خطأ", cover: this.icon, chapters: [] };
    }
  },

  async parseChapter(chapterUrl) {
    try {
      const res = await fetch(chapterUrl);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title = doc.querySelector("h1, h2")?.textContent.trim() || "بدون عنوان";
      const content = doc.querySelector(".entry-content")?.innerHTML || "<p>لا يوجد محتوى</p>";
      return { name: title, content };
    } catch (e) {
      console.error(e); return { name: "خطأ", content: "<p>فشل التحميل</p>" };
    }
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = plugin;
