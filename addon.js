const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// 1. إعداد الـ Manifest الخاص بالإضافة
const manifest = {
    id: "org.tomandjerry.classic161",
    version: "1.0.0",
    name: "Tom & Jerry Classic Collection",
    description: "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة)",
    resources: ["catalog", "meta", "stream"],
    types: ["series"],
    catalogs: [
        {
            type: "series",
            id: "tj_classic_catalog",
            name: "Tom & Jerry Classic"
        }
    ]
};

const builder = new addonBuilder(manifest);
const MAGNET_HASH = "3D82DE91E551C7C30EF00ED0E9B6BBE4F8F943DF";

// 2. معالج الكتالوج (Catalog Handler)
builder.defineCatalogHandler(({ type, id }) => {
    if (type === "series" && id === "tj_classic_catalog") {
        return Promise.resolve({
            metas: [{
                id: "tj_161_series",
                type: "series",
                name: "Tom and Jerry - Complete 161 Episodes",
                poster: "https://upload.wikimedia.org/wikipedia/en/5/5f/Tom_and_Jerry_title_card.png",
                description: "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة دقة DVD-Rip عالية الجودة)."
            }]
        });
    }
    return Promise.resolve({ metas: [] });
});

// 3. معالج تفاصيل المسلسل والحلقات (Meta Handler)
builder.defineMetaHandler(({ type, id }) => {
    if (type === "series" && id === "tj_161_series") {
        const videos = Array.from({ length: 161 }, (_, i) => ({
            id: `tj_161_series:1:${i + 1}`,
            title: `الحلقة ${i + 1}`,
            season: 1,
            episode: i + 1,
            released: new Date().toISOString()
        }));

        return Promise.resolve({
            meta: {
                id: "tj_161_series",
                type: "series",
                name: "Tom and Jerry - Complete 161 Episodes",
                poster: "https://upload.wikimedia.org/wikipedia/en/5/5f/Tom_and_Jerry_title_card.png",
                description: "المجموعة الكلاسيكية الكاملة 161 حلقة.",
                videos: videos
            }
        });
    }
    return Promise.resolve({ meta: null });
});

// 4. معالج رابط البث (Stream Handler)
builder.defineStreamHandler(({ type, id }) => {
    if (type === "series" && id.startsWith("tj_161_series:")) {
        const parts = id.split(":");
        const episodeIdx = parseInt(parts[2]) - 1;

        return Promise.resolve({
            streams: [{
                title: `Tom & Jerry - Episode ${episodeIdx + 1} (DVD-Rip)`,
                infoHash: MAGNET_HASH,
                fileIdx: episodeIdx
            }]
        });
    }
    return Promise.resolve({ streams: [] });
});

// 5. قراءة المنافذ ديناميكياً لتشغيل السيرفر على Railway
const port = process.env.PORT || 7070;
serveHTTP(builder.getInterface(), { port: port });
console.log(`Addon running on port ${port}`);
