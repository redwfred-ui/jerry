const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

// رابط الصورة المخصصة للكتالوج والحلقات (يمكنك استبدال الرابط بأي رابط صورة مباشر)
const CUSTOM_POSTER = "https://upload.wikimedia.org/wikipedia/en/5/5f/Tom_and_Jerry_title_card.png";

// 1. إعداد الـ Manifest الخاص بالإضافة
const manifest = {
    id: "org.tomandjerry.classic161.tmdb",
    version: "1.1.0",
    name: "Tom & Jerry Classic Collection",
    description: "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة) مع دعم TMDB والصورة المخصصة.",
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

// الـ InfoHash الخاص بملف التورنت بترميز متوافق مع Stremio
const MAGNET_HASH = "3d82de91e551c7c30ef00ed0e9b6bbe4f8f943df";

// 2. معالج الكتالوج (Catalog Handler)
builder.defineCatalogHandler(({ type, id }) => {
    if (type === "series" && id === "tj_classic_catalog") {
        return Promise.resolve({
            metas: [{
                id: "tj_161_series",
                type: "series",
                name: "Tom and Jerry - Complete 161 Episodes",
                poster: CUSTOM_POSTER,
                background: CUSTOM_POSTER,
                description: "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة بدقة DVD-Rip عالية الجودة)."
            }]
        });
    }
    return Promise.resolve({ metas: [] });
});

// 3. معالج تفاصيل المسلسل والحلقات والأوصاف (Meta Handler)
builder.defineMetaHandler(async ({ type, id }) => {
    if (type === "series" && id === "tj_161_series") {
        let tmdbEpisodes = [];

        try {
            // تجليب أسماء وأوصاف الحلقات باللغة العربية من TMDB بحماية زمنية (Timeout 3 ثوانٍ)
            const tmdbRes = await axios.get(
                "https://api.themoviedb.org/3/tv/4620/season/1?api_key=15d2ea6d0da1d836f4d0b2d60f70b6ac&language=ar-SA",
                { timeout: 3000 }
            );
            tmdbEpisodes = tmdbRes.data.episodes || [];
        } catch (e) {
            console.log("TMDB Fetch Notice: Using default episode titles and metadata.");
        }

        // إنشاء البيانات المكتملة لـ 161 حلقة
        const videos = Array.from({ length: 161 }, (_, i) => {
            const epNum = i + 1;
            const tmdbEp = tmdbEpisodes[i];

            return {
                id: `tj_161_series:1:${epNum}`,
                title: tmdbEp && tmdbEp.name ? `${epNum}. ${tmdbEp.name}` : `الحلقة ${epNum}`,
                season: 1,
                episode: epNum,
                overview: tmdbEp && tmdbEp.overview ? tmdbEp.overview : `الحلقة الكلاسيكية رقم ${epNum} من سلسلة توم وجيري الشهيرة.`,
                released: tmdbEp && tmdbEp.air_date ? new Date(tmdbEp.air_date).toISOString() : new Date("1940-02-10").toISOString(),
                thumbnail: CUSTOM_POSTER
            };
        });

        return Promise.resolve({
            meta: {
                id: "tj_161_series",
                type: "series",
                name: "Tom and Jerry - Complete 161 Episodes",
                poster: CUSTOM_POSTER,
                background: CUSTOM_POSTER,
                description: "المجموعة الكلاسيكية الكاملة 161 حلقة متسلسلة ومشغلة مباشرة.",
                videos: videos
            }
        });
    }
    return Promise.resolve({ meta: null });
});

// 4. معالج روابط التورنت والبث المباشر (Stream Handler)
builder.defineStreamHandler(({ type, id }) => {
    if (type === "series" && id.startsWith("tj_161_series:")) {
        const parts = id.split(":");
        const episodeIdx = parseInt(parts[2], 10) - 1; // تحديد ترتيب الملف داخل التورنت (0-based)

        if (episodeIdx >= 0 && episodeIdx < 161) {
            return Promise.resolve({
                streams: [{
                    title: `Tom & Jerry - Episode ${episodeIdx + 1} (DVD-Rip Quality)`,
                    infoHash: MAGNET_HASH,
                    fileIdx: episodeIdx
                }]
            });
        }
    }
    return Promise.resolve({ streams: [] });
});

// 5. قراءة منفذ التشغيل الخاص بـ Railway وتطبيق سيرفر HTTP
const port = parseInt(process.env.PORT, 10) || 7070;
serveHTTP(builder.getInterface(), { port: port });
console.log(`Stremio Addon Server active on port ${port}`);
