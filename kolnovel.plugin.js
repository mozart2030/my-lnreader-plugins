(function() {
  const KolNovel = {
    id: 'kolnovel',
    name: 'KolNovel',
    version: 1,
    site: 'https://kolnovel.com/',
    icon: 'https://cdn-icons-png.flaticon.com/512/2909/2909546.png',
    lang: 'ar',
    hasUpdate: true,
    hasSearch: true,
    hasFilters: true,
    
    filters: [
      {
        id: 'sort',
        name: 'الترتيب',
        values: [
          { id: 'new', name: 'أحدث' },
          { id: 'updated', name: 'تم التحديث' },
          { id: 'popular', name: 'المشهورة' },
          { id: 'added', name: 'الإضافات الجديدة' }
        ]
      },
      {
        id: 'status',
        name: 'الحالة',
        values: [
          { id: 'completed', name: 'مكتملة' },
          { id: 'ongoing', name: 'قيد الإصدار' },
          { id: 'hiatus', name: 'متوقفة' }
        ]
      }
    ],

    // 🔹 الدوال الأساسية - مطابقة للأصل
    search: function(searchTerm) {
      return new Promise((resolve) => {
        resolve([]);
      });
    },

    getList: function(page, filters) {
      return new Promise((resolve) => {
        resolve([]);
      });
    },

    getDetails: function(url) {
      return new Promise((resolve) => {
        resolve({
          title: 'عنوان الرواية',
          author: 'المؤلف',
          desc: 'وصف الرواية',
          url: url,
          status: 'مكتملة',
          chapters: []
        });
      });
    },

    getChapters: function(url) {
      return new Promise((resolve) => {
        resolve([
          {
            name: 'الفصل 1',
            url: url + '/chapter-1',
            releaseTime: '2024-01-01'
          }
        ]);
      });
    },

    readChapter: function(url) {
      return new Promise((resolve) => {
        resolve('<p>محتوى الفصل</p>');
      });
    }
  };

  // 🔹 التصدير بالطريقة الرسمية
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = KolNovel;
  } else {
    window.KolNovel = KolNovel;
  }
})();
