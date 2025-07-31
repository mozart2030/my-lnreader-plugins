function manifest() {
  return {
    id: "kolnovel",
    name: "KolNovel",
    author: "محمد",
    version: "1.0.0",
    icon: "https://kolnovel.com/favicon.ico",
    baseUrl: "https://kolnovel.com",
    lang: "ar",
    tags: ["Arabic"],
    type: "novel",
  };
}

async function search(query) {
  const url = `https://kolnovel.com/?s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const results = [];
  const items = doc.querySelectorAll(".post");

  for (const item of items) {
    const title = item.querySelector(".entry-title a")?.textContent.trim();
    const link = item.querySelector(".entry-title a")?.getAttribute("href");
    const cover = item.querySelector("img")?.getAttribute("src");

    if (title && link) {
      results.push({ title, url: link, cover });
    }
  }

  return results;
}

async function fetchNovel(url) {
  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector(".entry-title")?.textContent.trim();
  const cover = doc.querySelector(".entry-content img")?.getAttribute("src");
  const author = "غير معروف";
  const summary = doc.querySelector(".entry-content p")?.textContent.trim();

  const chapters = [];
  const chapterLinks = doc.querySelectorAll(".entry-content a");

  for (const link of chapterLinks) {
    const name = link.textContent.trim();
    const chapterUrl = link.getAttribute("href");

    if (name && chapterUrl) {
      chapters.push({ name, url: chapterUrl });
    }
  }

  return {
    title,
    cover,
    author,
    summary,
    chapters,
  };
}

async function fetchChapter(chapterUrl) {
  const res = await fetch(chapterUrl);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const content = doc.querySelector(".entry-content")?.innerHTML;

  return content;
}
