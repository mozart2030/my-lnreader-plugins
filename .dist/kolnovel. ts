import { Plugin } from "@typings/plugin";
import { fetchText } from "@libs/fetch";
import { defaultCover } from "@libs/defaultCover";

const baseUrl = "https://kolnovel.com";

export const id = "kolnovel";
export const name = "KolNovel";
export const site = baseUrl;
export const lang = "ar";
export const version = "1.0.0";
export const icon = "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png";

export const popularNovels: Plugin.popularNovels = async function (page) {
  const url = `${baseUrl}/page/${page}/`;
  const body = await fetchText(url);
  const novels: Plugin.NovelItem[] = [];
  const doc = new DOMParser().parseFromString(body, "text/html");
  doc.querySelectorAll(".post-title a").forEach(a => {
    novels.push({
      name: a.textContent.trim(),
      url: a.href,
      cover: defaultCover,
    });
  });
  return novels;
};

export const searchNovels: Plugin.searchNovels = async function (searchTerm) {
  const url = `${baseUrl}/?s=${encodeURIComponent(searchTerm)}`;
  const body = await fetchText(url);
  const novels: Plugin.NovelItem[] = [];
  const doc = new DOMParser().parseFromString(body, "text/html");
  doc.querySelectorAll(".post-title a").forEach(a => {
    novels.push({
      name: a.textContent.trim(),
      url: a.href,
      cover: defaultCover,
    });
  });
  return novels;
};

export const parseNovel: Plugin.parseNovel = async function (novelUrl) {
  const body = await fetchText(novelUrl);
  const doc = new DOMParser().parseFromString(body, "text/html");
  const title = doc.querySelector("h1")?.textContent.trim() || "بدون عنوان";
  const chapters: Plugin.ChapterItem[] = [];
  doc.querySelectorAll(".entry-content a[href*='kolnovel.com']").forEach(a => {
    chapters.push({
      name: a.textContent.trim(),
      url: a.href,
    });
  });
  return {
    name: title,
    cover: defaultCover,
    chapters: chapters.reverse(),
  };
};

export const parseChapter: Plugin.parseChapter = async function (chapterUrl) {
  const body = await fetchText(chapterUrl);
  const doc = new DOMParser().parseFromString(body, "text/html");
  const title = doc.querySelector("h1, h2")?.textContent.trim() || "بدون عنوان";
  const content = doc.querySelector(".entry-content")?.innerHTML || "<p>لا يوجد محتوى</p>";
  return { name: title, content };
};
