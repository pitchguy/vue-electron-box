import os from 'os';
import Book from '@/assets/js/books';

/**
 * @param {*} name
 * @returns
 */
const getStore = name => {
    return localStorage.getItem(name) || '';
};

/**
 * @param {*} list
 * @returns
 */
const normalizeBooks = list => {
    let ret = [];
    let arr = list;
    arr.forEach(item => {
        let book = new Book({
            id: item._id,
            title: item.title,
            cover: item.cover,
            major: item.majorCate || '',
            minor: item.minorCate || '',
            author: item.author,
            shortIntro: item.shortIntro || '',
            retentionRatio: item.retentionRatio || '',
            latelyFollower: item.latelyFollower || '',
            desc: item.desc || '',
            bookCount: item.bookCount || '',
            collectorCount: item.collectorCount || '',
        });
        ret.push(book);
    });
    return ret;
};
/**
 *
 *
 * @returns { uuid }
 */
const getuuid = (() => {
    var e = function() {
            for (var e = 1 * new Date(), t = 0; e == 1 * new Date(); ) t++;
            return e.toString(16) + t.toString(16);
        },
        t = function() {
            return Math.random()
                .toString(16)
                .replace('.', '');
        },
        r = function(e) {
            function t(e, t) {
                var r,
                    n = 0;
                for (r = 0; r < t.length; r++) n |= i[r] << (8 * r);
                return e ^ n;
            }

            var r,
                n,
                a = navigator.userAgent,
                i = [],
                o = 0;
            for (r = 0; r < a.length; r++)
                (n = a.charCodeAt(r)),
                    i.unshift(255 & n),
                    i.length >= 4 && ((o = t(o, i)), (i = []));
            return i.length > 0 && (o = t(o, i)), o.toString(16);
        };
    return function() {
        var n = String(screen.height * screen.width);
        n =
            n && /\d{5,}/.test(n)
                ? n.toString(16)
                : String(31242 * Math.random())
                      .replace('.', '')
                      .slice(0, 8);
        return e() + '-' + t() + '-' + r() + '-' + n + '-' + e();
    };
})();

/**
 *
 * @returns { homedir 默认路径, username 用户名称, shell 用户shell, gid, uid}
 */
const getUserinfo = () => {
    return os.userInfo();
};
export { getStore, normalizeBooks, getUserinfo, getuuid };
