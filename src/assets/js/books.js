export default class bookClass {
    constructor({
        id,
        title,
        cover,
        major,
        minor,
        author,
        shortIntro,
        retentionRatio,
        latelyFollower,
        desc,
        bookCount,
        collectorCount,
    }) {
        this.id = id;
        this.title = title;
        this.cover = cover;
        this.major = major;
        this.minor = minor;
        this.author = author;
        this.shortIntro = shortIntro;
        this.retentionRatio = retentionRatio;
        this.latelyFollower = latelyFollower;
        this.desc = desc;
        this.bookCount = bookCount;
        this.collectorCount = collectorCount;
    }
}
