const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// =========================================================
// TOM & JERRY IMAGE
// =========================================================

// رابط صورة حقيقي وثابت بدل USERNAME/REPOSITORY
const CUSTOM_POSTER =
    "https://upload.wikimedia.org/wikipedia/en/5/5f/Tom_and_Jerry_title_card.png";

// نستخدم نفس الصورة كصورة للحلقات
const EPISODE_THUMBNAIL = CUSTOM_POSTER;

// =========================================================
// CLASSIC EPISODES
// =========================================================

const CLASSIC_EPISODES = [
    { ep: 1, title: "Puss Gets the Boot", date: "1940-02-10" },
    { ep: 2, title: "The Midnight Snack", date: "1941-07-19" },
    { ep: 3, title: "The Night Before Christmas", date: "1941-12-06" },
    { ep: 4, title: "Fraidy Cat", date: "1942-01-17" },
    { ep: 5, title: "Dog Trouble", date: "1942-04-18" },
    { ep: 6, title: "Puss n' Toots", date: "1942-05-30" },
    { ep: 7, title: "The Bowling Alley Cat", date: "1942-07-18" },
    { ep: 8, title: "Fine Feathered Friend", date: "1942-10-10" },
    { ep: 9, title: "Sufferin' Cats!", date: "1943-01-16" },
    { ep: 10, title: "Lonesome Mouse", date: "1943-05-22" },
    { ep: 11, title: "The Yankee Doodle Mouse", date: "1943-06-26" },
    { ep: 12, title: "Baby Puss", date: "1943-12-25" },
    { ep: 13, title: "The Zoot Cat", date: "1944-02-26" },
    { ep: 14, title: "Million Dollar Cat", date: "1944-05-06" },
    { ep: 15, title: "The Bodyguard", date: "1944-07-22" },
    { ep: 16, title: "Puttin' on the Dog", date: "1944-10-28" },
    { ep: 17, title: "Mouse Trouble", date: "1944-11-23" },
    { ep: 18, title: "The Mouse Comes to Dinner", date: "1945-05-05" },
    { ep: 19, title: "Mouse in Manhattan", date: "1945-07-07" },
    { ep: 20, title: "Tee for Two", date: "1945-07-21" },
    { ep: 21, title: "Flirty Birdy", date: "1945-09-22" },
    { ep: 22, title: "Quiet Please!", date: "1945-12-22" },
    { ep: 23, title: "Springtime for Thomas", date: "1946-03-30" },
    { ep: 24, title: "The Milky Waif", date: "1946-05-18" },
    { ep: 25, title: "Trap Happy", date: "1946-06-29" },
    { ep: 26, title: "Solid Serenade", date: "1946-08-31" },
    { ep: 27, title: "Cat Fishin'", date: "1947-02-22" },
    { ep: 28, title: "Part Time Pal", date: "1947-03-15" },
    { ep: 29, title: "The Cat Concerto", date: "1947-04-26" },
    { ep: 30, title: "Dr. Jekyll and Mr. Mouse", date: "1947-06-14" },
    { ep: 31, title: "Salt Water Tabby", date: "1947-07-12" },
    { ep: 32, title: "A Mouse in the House", date: "1947-08-30" },
    { ep: 33, title: "The Invisible Mouse", date: "1947-09-27" },
    { ep: 34, title: "Kitty Foiled", date: "1948-06-01" },
    { ep: 35, title: "The Truce Hurts", date: "1948-07-17" },
    { ep: 36, title: "Old Rockin' Chair Tom", date: "1948-09-18" },
    { ep: 37, title: "Professor Tom", date: "1948-10-30" },
    { ep: 38, title: "Mouse Cleaning", date: "1948-12-11" },
    { ep: 39, title: "Polkadot Pussycat", date: "1949-02-26" },
    { ep: 40, title: "The Little Orphan", date: "1949-04-30" },
    { ep: 41, title: "Hatch Up Your Troubles", date: "1949-05-14" },
    { ep: 42, title: "Heavenly Puss", date: "1949-07-09" },
    { ep: 43, title: "The Cat and the Mermouse", date: "1949-09-03" },
    { ep: 44, title: "Love That Puppy", date: "1949-10-01" },
    { ep: 45, title: "Jerry's Diary", date: "1949-10-22" },
    { ep: 46, title: "Tennis Chumps", date: "1949-12-10" },
    { ep: 47, title: "Little Quacker", date: "1950-01-07" },
    { ep: 48, title: "Saturday Evening Puss", date: "1950-01-14" },
    { ep: 49, title: "Texas Tom", date: "1950-03-11" },
    { ep: 50, title: "Jerry and the Lion", date: "1950-04-08" },
    { ep: 51, title: "Safety Second", date: "1950-07-01" },
    { ep: 52, title: "Tom and Jerry in the Hollywood Bowl", date: "1950-09-17" },
    { ep: 53, title: "The Framed Cat", date: "1950-10-21" },
    { ep: 54, title: "Cue Ball Cat", date: "1950-11-25" },
    { ep: 55, title: "Casanova Cat", date: "1951-01-06" },
    { ep: 56, title: "Jerry and the Goldfish", date: "1951-03-03" },
    { ep: 57, title: "Jerry's Cousin", date: "1951-04-07" },
    { ep: 58, title: "Sleepy-Time Tom", date: "1951-05-26" },
    { ep: 59, title: "His Mouse Friday", date: "1951-07-07" },
    { ep: 60, title: "Slicked-up Pup", date: "1951-09-08" },
    { ep: 61, title: "Nit-witty Kitty", date: "1951-10-06" },
    { ep: 62, title: "Cat Napping", date: "1951-12-08" },
    { ep: 63, title: "The Flying Cat", date: "1952-01-12" },
    { ep: 64, title: "The Duck Doctor", date: "1952-02-16" },
    { ep: 65, title: "Two Mouseketeers", date: "1952-03-15" },
    { ep: 66, title: "Smitten Kitten", date: "1952-04-12" },
    { ep: 67, title: "Triple Trouble", date: "1952-04-19" },
    { ep: 68, title: "Little Runaway", date: "1952-06-14" },
    { ep: 69, title: "Fit to Be Tied", date: "1952-07-26" },
    { ep: 70, title: "Push-Button Kitty", date: "1952-09-06" },
    { ep: 71, title: "Cruise Cat", date: "1952-10-18" },
    { ep: 72, title: "The Dog House", date: "1952-11-29" },
    { ep: 73, title: "Missing Mouse", date: "1953-01-10" },
    { ep: 74, title: "Jerry and Jumbo", date: "1953-02-21" },
    { ep: 75, title: "Johann Mouse", date: "1953-03-21" },
    { ep: 76, title: "That's My Pup!", date: "1953-04-25" },
    { ep: 77, title: "Just Ducky", date: "1953-09-05" },
    { ep: 78, title: "Two Little Indians", date: "1953-10-17" },
    { ep: 79, title: "Life with Tom", date: "1953-11-21" },
    { ep: 80, title: "Puppy Tale", date: "1954-01-23" },
    { ep: 81, title: "Posse Cat", date: "1954-01-30" },
    { ep: 82, title: "Hic-cup Pup", date: "1954-04-17" },
    { ep: 83, title: "Little School Mouse", date: "1954-05-29" },
    { ep: 84, title: "Baby Butch", date: "1954-08-14" },
    { ep: 85, title: "Mice Follies", date: "1954-09-04" },
    { ep: 86, title: "Neapolitan Mouse", date: "1954-10-02" },
    { ep: 87, title: "Down Hearted Duckling", date: "1954-11-13" },
    { ep: 88, title: "Pet Peeve", date: "1954-11-20" },
    { ep: 89, title: "Touché, Pussy Cat!", date: "1954-12-18" },
    { ep: 90, title: "Southbound Duckling", date: "1955-03-12" },
    { ep: 91, title: "Pup on a Picnic", date: "1955-04-30" },
    { ep: 92, title: "Mouse for Sale", date: "1955-05-21" },
    { ep: 93, title: "Designs on Jerry", date: "1955-09-02" },
    { ep: 94, title: "Tom and Chérie", date: "1955-09-09" },
    { ep: 95, title: "Smarty Cat", date: "1955-10-14" },
    { ep: 96, title: "Pecos Pest", date: "1955-11-11" },
    { ep: 97, title: "That's My Mommy", date: "1955-11-19" },
    { ep: 98, title: "The Flying Sorceress", date: "1956-01-27" },
    { ep: 99, title: "The Egg and Jerry", date: "1956-03-23" },
    { ep: 100, title: "Busy Buddies", date: "1956-05-04" },
    { ep: 101, title: "Muscle Beach Tom", date: "1956-09-07" },
    { ep: 102, title: "Down Beat Bear", date: "1956-10-21" },
    { ep: 103, title: "Blue Cat Blues", date: "1956-11-16" },
    { ep: 104, title: "Barbecue Brawl", date: "1956-12-14" },
    { ep: 105, title: "Tops with Pops", date: "1957-02-22" },
    { ep: 106, title: "Timid Tabby", date: "1957-04-19" },
    { ep: 107, title: "Feedin' the Kitty", date: "1957-06-07" },
    { ep: 108, title: "Mucho Mouse", date: "1957-09-06" },
    { ep: 109, title: "Tom's Photo Finish", date: "1957-11-01" },
    { ep: 110, title: "Happy Go Ducky", date: "1958-01-03" },
    { ep: 111, title: "Royal Cat Nap", date: "1958-03-07" },
    { ep: 112, title: "The Vanishing Duck", date: "1958-05-02" },
    { ep: 113, title: "Robin Hoodwinked", date: "1958-06-06" },
    { ep: 114, title: "Tot Watchers", date: "1958-08-01" },
    { ep: 115, title: "Switchin' Kitten", date: "1961-09-07" },
    { ep: 116, title: "Down and Outing", date: "1961-10-26" },
    { ep: 117, title: "It's Greek to Me-ow!", date: "1961-12-07" },
    { ep: 118, title: "High Steaks", date: "1962-03-23" },
    { ep: 119, title: "Mouse Into Space", date: "1962-04-13" },
    { ep: 120, title: "Landing Stripling", date: "1962-05-18" },
    { ep: 121, title: "Calypso Cat", date: "1962-06-22" },
    { ep: 122, title: "Dicky Moe", date: "1962-07-20" },
    { ep: 123, title: "The Tom and Jerry Cartoon Kit", date: "1962-08-10" },
    { ep: 124, title: "Tall in the Trap", date: "1962-09-14" },
    { ep: 125, title: "Sorry Safari", date: "1962-10-12" },
    { ep: 126, title: "Buddies Thicker Than Water", date: "1962-11-01" },
    { ep: 127, title: "Carmen Get It!", date: "1962-12-21" },
    { ep: 128, title: "Pent-House Mouse", date: "1963-07-27" },
    { ep: 129, title: "The Cat Above and the Mouse Below", date: "1964-02-25" },
    { ep: 130, title: "Is There a Doctor in the Mouse?", date: "1964-03-24" },
    { ep: 131, title: "Much Ado About Mousing", date: "1964-04-14" },
    { ep: 132, title: "Snowbody Loves Me", date: "1964-05-12" },
    { ep: 133, title: "The Unshrinkable Jerry Mouse", date: "1964-12-08" },
    { ep: 134, title: "Ah, Sweet Mouse-Story of Life", date: "1965-01-20" },
    { ep: 135, title: "Tom-ic Energy", date: "1965-01-27" },
    { ep: 136, title: "Bad Day at Cat Rock", date: "1965-02-10" },
    { ep: 137, title: "The Brothers Carry-Mouse-Off", date: "1965-03-03" },
    { ep: 138, title: "Haunted Mouse", date: "1965-03-24" },
    { ep: 139, title: "I'm Just Wild About Jerry", date: "1965-04-07" },
    { ep: 140, title: "Of Feline Bondage", date: "1965-05-19" },
    { ep: 141, title: "The Year of the Mouse", date: "1965-06-09" },
    { ep: 142, title: "The Cat's Me-Ouch!", date: "1965-12-22" },
    { ep: 143, title: "Duel Personality", date: "1966-01-20" },
    { ep: 144, title: "Jerry, Jerry, Quite Contrary", date: "1966-02-17" },
    { ep: 145, title: "Jerry-Go-Round", date: "1966-03-03" },
    { ep: 146, title: "Love Me, Love My Mouse", date: "1966-04-28" },
    { ep: 147, title: "Puss 'n' Boats", date: "1966-05-05" },
    { ep: 148, title: "Filet Meow", date: "1966-06-30" },
    { ep: 149, title: "Matinee Mouse", date: "1966-07-14" },
    { ep: 150, title: "The A-Tom-inable Snowman", date: "1966-08-04" },
    { ep: 151, title: "Catty-Cornered", date: "1966-09-08" },
    { ep: 152, title: "Cat and Dupli-cat", date: "1967-01-16" },
    { ep: 153, title: "O-Solar Meow", date: "1967-01-24" },
    { ep: 154, title: "Guided Mouse-ille", date: "1967-03-10" },
    { ep: 155, title: "Rock 'n' Rodent", date: "1967-03-15" },
    { ep: 156, title: "Cannery Rodent", date: "1967-04-14" },
    { ep: 157, title: "The Mouse from H.U.N.G.E.R.", date: "1967-04-21" },
    { ep: 158, title: "Surf-Bored Cat", date: "1967-05-05" },
    { ep: 159, title: "Shutter Bugged Cat", date: "1967-06-16" },
    { ep: 160, title: "Advance and Be Mechanized", date: "1967-08-25" },
    { ep: 161, title: "Purr-Chance to Dream", date: "1967-09-08" }
];

// =========================================================
// MANIFEST
// =========================================================

const manifest = {
    id: "org.tomandjerry.classic161.v7",
    version: "7.0.0",
    name: "Tom & Jerry Classic Collection",
    description:
        "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة).",

    resources: [
        "catalog",
        "meta",
        "stream"
    ],

    types: [
        "series"
    ],

    idPrefixes: [
        "tj_161_series"
    ],

    catalogs: [
        {
            type: "series",
            id: "tj_classic_catalog",
            name: "Tom & Jerry Classic"
        }
    ]
};

// =========================================================
// BUILDER
// =========================================================

const builder = new addonBuilder(manifest);

// =========================================================
// CATALOG
// =========================================================

builder.defineCatalogHandler(({ type, id }) => {

    if (
        type === "series" &&
        id === "tj_classic_catalog"
    ) {

        return Promise.resolve({

            metas: [

                {
                    id: "tj_161_series",

                    type: "series",

                    name:
                        "Tom and Jerry - Complete 161 Episodes",

                    // أهم شيء للـCatalog
                    poster: CUSTOM_POSTER,

                    // يحدد شكل الصورة
                    posterShape: "poster",

                    background: CUSTOM_POSTER,

                    description:
                        "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري (161 حلقة)."
                }

            ]
        });
    }

    return Promise.resolve({
        metas: []
    });
});

// =========================================================
// META
// =========================================================

builder.defineMetaHandler(({ type, id }) => {

    if (
        type === "series" &&
        id === "tj_161_series"
    ) {

        const videos =
            CLASSIC_EPISODES.map(epData => {

                return {

                    id:
                        `tj_161_series:1:${epData.ep}`,

                    title:
                        `${epData.ep}. ${epData.title}`,

                    season: 1,

                    episode:
                        epData.ep,

                    released:
                        new Date(
                            epData.date
                        ).toISOString(),

                    // صورة الحلقة
                    thumbnail:
                        EPISODE_THUMBNAIL,

                    overview:
                        `Tom and Jerry Classic Short Episode #${epData.ep}: ${epData.title}`,

                    description:
                        `الحلقة ${epData.ep}: ${epData.title}. حلقة كلاسيكية من سلسلة توم وجيري.`
                };
            });

        return Promise.resolve({

            meta: {

                id: "tj_161_series",

                type: "series",

                name:
                    "Tom and Jerry - Complete 161 Episodes",

                poster:
                    CUSTOM_POSTER,

                posterShape:
                    "poster",

                background:
                    CUSTOM_POSTER,

                logo:
                    CUSTOM_POSTER,

                description:
                    "المجموعة الكلاسيكية الكاملة لحلقات توم وجيري، 161 حلقة.",

                videos:
                    videos
            }
        });
    }

    return Promise.resolve({
        meta: null
    });
});

// =========================================================
// STREAM
// =========================================================
//
// ضع هنا فقط مصدر فيديو تملك حق استخدامه.
// لا تستخدم infoHash لمحتوى غير مصرح به.
//

builder.defineStreamHandler(({ type, id }) => {

    if (
        type === "series" &&
        id.startsWith("tj_161_series:")
    ) {

        const parts =
            id.split(":");

        const episodeNumber =
            parseInt(
                parts[2],
                10
            );

        if (
            episodeNumber >= 1 &&
            episodeNumber <= CLASSIC_EPISODES.length
        ) {

            /*
             * مثال لمصدر HTTP مصرح به:
             *
             * return Promise.resolve({
             *     streams: [{
             *         title: "Tom & Jerry",
             *         url: "https://YOUR-AUTHORIZED-SERVER/video.mp4",
             *         behaviorHints: {
             *             notWebReady: false
             *         }
             *     }]
             * });
             */

            return Promise.resolve({
                streams: []
            });
        }
    }

    return Promise.resolve({
        streams: []
    });
});

// =========================================================
// SERVER
// =========================================================

const port =
    parseInt(
        process.env.PORT,
        10
    ) || 7070;

serveHTTP(
    builder.getInterface(),
    {
        port: port
    }
);

console.log(
    `Tom & Jerry Stremio Addon active on port ${port}`
);
