/**
 * KolNovel Arabic Source Plugin
 * Compatible with LNReader plugin system
 * Author: Mozart
 * Website: https://kolnovel.com
 */

function KolNovel() {
    const baseUrl = "https://kolnovel.com";

    return {
        id: "kolnovel",
        name: "KolNovel",
        version: 1,
        icon: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
        author: "Mozart",
        lang: "ar",
        website: baseUrl,
        hasUpdate: false,
        hasSearch: true,

        async search(query) {
            const url = `${baseUrl}/?s=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            const html = await response.text();
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

        async popular(page) {
            const url = `${baseUrl}/page/${page}/`;
            const response = await fetch(url);
            const html = await response.text();
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

        async parseNovel(url) {
            const response = await fetch(url);
            const html = await response.text();
            const dom = new DOMParser().parseFromString(html, "text/html");

            const title = dom.querySelector("h1")?.textContent?.trim() || "Unknown";
            const chapters = [];

            dom.querySelectorAll(".chapter-title a").forEach(a => {
                chapters.push({
                    name: a.textContent.trim(),
                    url: a.href,
                });
            });

            return {
                name: title,
                cover: "https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png",
                chapters,
            };
        },

        async parseChapter(url) {
            const response = await fetch(url);
            const html = await response.text();
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
