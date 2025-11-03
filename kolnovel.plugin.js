{
  "id": "kolnovel",
  "name": "KolNovel",
  "version": 1,
  "site": "https://kolnovel.com/",
  "icon": "https://cdn-icons-png.flaticon.com/512/2909/2909546.png",
  "lang": "ar",
  "hasUpdate": true,
  "hasSearch": true,
  
  "filters": [
    {
      "id": "sort",
      "name": "الترتيب",
      "values": [
        {"id": "new", "name": "أحدث"},
        {"id": "updated", "name": "تم التحديث"},
        {"id": "popular", "name": "المشهورة"},
        {"id": "added", "name": "الإضافات الجديدة"}
      ]
    }
  ],

  "search": function(searchTerm) {
    return [];
  },
  
  "getList": function(page, filters) {
    return [];
  },
  
  "getDetails": function(url) {
    return {
      title: "عنوان تجريبي",
      author: "مؤلف",
      desc: "وصف تجريبي للرواية",
      url: url,
      status: "مكتملة"
    };
  },
  
  "getChapters": function(url) {
    return [
      {
        name: "الفصل الأول",
        url: url + "/chapter-1",
        releaseTime: "2024-01-01"
      }
    ];
  },
  
  "readChapter": function(url) {
    return "<p>هذا محتوى تجريبي للفصل. يجب تطوير هذا الجزء ليعمل مع الموقع الحقيقي.</p>";
  }
}
