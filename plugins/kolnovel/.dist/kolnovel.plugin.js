const baseUrl = "https://kolnovel.com";

const plugin = {
  id: "kolnovel",
  name: "KolNovel",
  version: "1.0.0",
  icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
  site: baseUrl,
  lang: "ar",
  author: "Mozart",
  
  async popular(page) {
    try {
      const response = await fetch(`${baseUrl}/page/${page || 1}/`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      
      const novels = [];
      // يجب تعديل ال selectors حسب بنية الموقع الفعلية
      doc.querySelectorAll(".novel-item").forEach(element => {
        const link = element.querySelector("a");
        const img = element.querySelector("img");
        
        if (link) {
          novels.push({
            name: link.textContent.trim(),
            url: link.href,
            cover: img?.src || this.icon
          });
        }
      });
      
      return novels;
    } catch (error) {
      console.error("Error in popular():", error);
      return [];
    }
  },

  async search(query) {
    try {
      const response = await fetch(`${baseUrl}/?s=${encodeURIComponent(query)}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      
      const novels = [];
      doc.querySelectorAll(".search-result, .novel-item").forEach(element => {
        const link = element.querySelector("a");
        const img = element.querySelector("img");
        
        if (link) {
          novels.push({
            name: link.textContent.trim(),
            url: link.href,
            cover: img?.src || this.icon
          });
        }
      });
      
      return novels;
    } catch (error) {
      console.error("Error in search():", error);
      return [];
    }
  },

  async parseNovel(novelUrl) {
    try {
      const response = await fetch(novelUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      
      const title = doc.querySelector("h1.entry-title")?.textContent.trim() || 
                   doc.querySelector("h1")?.textContent.trim() || "بدون عنوان";
      
      const cover = doc.querySelector(".novel-cover img")?.src || 
                   doc.querySelector("meta[property='og:image']")?.content || 
                   this.icon;
      
      const chapters = [];
      // يجب تعديل ال selector حسب بنية الموقع
      doc.querySelectorAll(".chapter-list a, .volume-list a").forEach(link => {
        chapters.push({
          name: link.textContent.trim(),
          url: link.href
        });
      });
      
      return {
        name: title,
        cover: cover,
        chapters: chapters.reverse() // لترتيب الفصول تصاعديًا
      };
    } catch (error) {
      console.error("Error in parseNovel():", error);
      return { name: "خطأ في التحميل", cover: this.icon, chapters: [] };
    }
  },

  async parseChapter(chapterUrl) {
    try {
      const response = await fetch(chapterUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      
      const title = doc.querySelector("h1.entry-title")?.textContent.trim() || 
                   doc.querySelector("h1")?.textContent.trim() || "بدون عنوان";
      
      const contentElement = doc.querySelector(".entry-content");
      if (contentElement) {
        // إزالة العناصر غير المرغوبة
        contentElement.querySelectorAll("script, style, .ads, .advertisement").forEach(el => el.remove());
      }
      
      const content = contentElement?.innerHTML || "<p>لا يوجد محتوى</p>";
      
      return { 
        name: title, 
        content: content 
      };
    } catch (error) {
      console.error("Error in parseChapter():", error);
      return { name: "خطأ في التحميل", content: "<p>حدث خطأ أثناء تحميل الفصل</p>" };
    }
  }
};

// تصدير للاستخدام في LNReader
if (typeof module !== "undefined" && module.exports) {
  module.exports = plugin;
}
