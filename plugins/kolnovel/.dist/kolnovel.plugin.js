const baseUrl = "https://kolnovel.com";

async function fetchText(url) {
  const res = await fetch(url);
  return await res.text();
}

const plugin = {
  id: "kolnovel",
  name: "KolNovel",
  version: 1,
  icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
  site: baseUrl,
  lang: "ar",
  author: "Mozart",
  hasSearch: true,
  hasUpdate: false,

  async popular(page) {
    const html = await fetchText(`${baseUrl}/page/${page || 1}/`);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const novels = [];
    doc.querySelectorAll(".post-title a").forEach(a => {
      novels.push({
        name: a.textContent.trim(),
        url: a.href,
        cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png"
      });
    });
    return novels;
  },

  async search(query) {
    const html = await fetchText(`${baseUrl}/?s=${encodeURIComponent(query)}`);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const novels = [];
    doc.querySelectorAll(".post-title a").forEach(a => {
      novels.push({
        name: a.textContent.trim(),
        url: a.href,
        cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png"
      });
    });
    return novels;
  },

  async parseNovel(url) {
    const html = await fetchText(url);
    const doc = new DOMParser().parseFromString(html, "text/html");

    const title = doc.querySelector("h1")?.textContent.trim() || "No Title";
    const chapters = [];
    doc.querySelectorAll(".entry-content a").forEach(a => {
      chapters.push({
        name: a.textContent.trim(),
        url: a.href
      });
    });
    return {
      name: title,
      cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
      chapters
    };
  },

  async parseChapter(url) {
    const html = await fetchText(url);
    const doc = new DOMParser().parseFromString(html, "text/html");

    const title = doc.querySelector("h1, h2")?.textContent.trim() || "No Title";
    const content = doc.querySelector(".entry-content")?.innerHTML || "No content found.";
    return { name: title, content };
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = plugin;
        }
