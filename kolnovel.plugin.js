module.exports = {
    id: 'kolnovel-arabic',
    name: 'KolNovel',
    version: '1.0.0',
    site: 'https://kolnovel.com/',
    lang: 'ar',
    icon: 'https://kolnovel.com/wp-content/uploads/2022/08/cropped-kolnovel-32x32.png',
    hasUpdate: false,
    hasSearch: true,
    
    // الدوال الأساسية
    search: function (searchTerm) {
        return [];
    },
    
    getList: function (page) {
        return [];
    },
    
    getDetails: function (url) {
        return {};
    },
    
    getChapters: function (url) {
        return [];
    },
    
    readChapter: function (url) {
        return '';
    }
};
