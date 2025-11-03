const baseUrl = "https://kolnovel.com";

const plugin = {
  id: "kolnovel",
  name: "KolNovel",
  version: "1.1.20",          // رفعته لأعلى من النسخة الأصلية
  icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
  site: baseUrl,
  lang: "ar",
  author: "Mozart",
  hasSearch: true,
  hasUpdate: false,

  // جلب صفحة شعبية / أحدث
  async popular(page) {
    try {
      const response = await fetch(`${baseUrl}/page/${page || 1}/`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const novels = [];
      // selectors أكثر أماناً حسب بنية الموقع الحالية
      doc.querySelectorAll(".post-title, .novel-item, .story-card").forEach(el => {
        const a = el.tagName === "A" ? el : el.querySelector("a");
        const img = el.querySelector("img");
        if (!a) return;

        novels.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: img?.src || this.icon
        });
      });
      return novels;
    } catch (e) {
      console.error("popular():", e);
      return [];
    }
  },

  // بحث
  async search(query) {
    try {
      const response = await fetch(`${baseUrl}/?s=${encodeURIComponent(query)}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const novels = [];
      doc.querySelectorAll(".search-wrap a, .post-title a").forEach(a => {
        const wrap = a.closest(".search-wrap, article, .story-card");
        const img = wrap?.querySelector("img");
        novels.push({
          name: a.textContent.trim(),
          url: a.href,
          cover: img?.src || this.icon
        });
      });
      return novels;
    } catch (e) {
      console.error("search():", e);
      return [];
    }
  },

  // بيانات الرواية + قائمة الفصول
  async parseNovel(novelUrl) {
    try {
      const response = await fetch(novelUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const title = doc.querySelector("h1.entry-title, h1")?.textContent.trim() || "بدون عنوان";
      const cover = doc.querySelector("meta[property='og:image']")?.content ||
                   doc.querySelector(".novel-cover img, .post-thumb img")?.src ||
                   this.icon;

      const chapters = [];
      // اجمع الروابط التي غالباً تكون فصولاً
      doc.querySelectorAll(".chapter-list a, .entry-content a[href*='kolnovel.com'], .page-item a").forEach(link => {
        const txt = link.textContent.trim();
        if (txt.length > 3) chapters.push({ name: txt, url: link.href });
      });

      return { name: title, cover, chapters: chapters.reverse() };
    } catch (e) {
      console.error("parseNovel():", e);
      return { name: "خطأ", cover: this.icon, chapters: [] };
    }
  },

  // محتوى الفصل
  async parseChapter(chapterUrl) {
    try {
      const response = await fetch(chapterUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const title = doc.querySelector("h1.entry-title, h2")?.textContent.trim() || "بدون عنوان";
      const contentEl = doc.querySelector(".entry-content");
      if (contentEl) {
        // تنظيف سريع
        contentEl.querySelectorAll("script, style, .ads, .sharedaddy, .jp-relatedposts").forEach(n => n.remove());
      }
      const content = contentEl?.innerHTML || "<p>لا يوجد محتوى</p>";
      return { name: title, content };
    } catch (e) {
      console.error("parseChapter():", e);
      return { name: "خطأ", content: "<p>تعذّر تحميل الفصل</p>" };
    }
  }
};

// تصدير لبيئات Node/CommonJS (ما يستخدمه LNReader)
if (typeof module !== "undefined" && module.exports) module.exports = plugin;
