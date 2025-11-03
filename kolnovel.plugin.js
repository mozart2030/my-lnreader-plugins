module.exports = {
    id: 'kolnovel-arabic',
    name: 'KolNovel',
    version: '1.0.0',
    site: 'https://kolnovel.com/',
    lang: 'ar',
    icon : "https://cdn-icons-png.flaticon.com/512/2909/2909546.png",
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
