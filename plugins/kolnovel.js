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
    type: "novel"
  };
}

async function search(query) {
  const url = `https://kolnovel.com/?s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const results = [];
  const items = doc.querySelectorAll(".post");

  for (const item of items) {
    const a = item.querySelector(".entry-title a");
    const img = item.querySelector("img");

    if (a) {
      results.push({
        title: a.textContent.trim(),
        url: a.href,
        cover: img?.src || ""
      });
    }
  }

  return results;
}

async function fetchNovel(url) {
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const title = doc.querySelector(".entry-title")?.textContent.trim();
  const cover = doc.querySelector(".entry-content img")?.src || "";
  const summary = doc.querySelector(".entry-content p")?.textContent.trim() || "";
  const author = "غير معروف";

  const chapters = [];
  const links = doc.querySelectorAll(".entry-content a");

  links.forEach((link) => {
    const name = link.textContent.trim();
    const chapterUrl = link.href;

    if (name && chapterUrl.includes("kolnovel.com")) {
      chapters.push({ name, url: chapterUrl });
    }
  });

  return { title, cover, author, summary, chapters };
}

async function fetchChapter(url) {
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const content = doc.querySelector(".entry-content");
  return content?.innerHTML || "لا يوجد محتوى";
}
