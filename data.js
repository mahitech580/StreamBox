/* =========================================================
   STREAMBOX
   Application Data
   ========================================================= */

"use strict";

/* =========================================================
   HERO CONTENT
   ========================================================= */

const heroContent = [
    {
        id: 101,
        title: "The Last Signal",
        type: "movie",
        year: 2026,
        duration: "2h 14m",
        rating: 8.7,
        age: "16+",
        quality: "4K",
        eyebrow: "FEATURED THIS WEEK",
        genres: ["Sci-Fi", "Thriller", "Mystery"],
        description:
            "A mysterious signal reaches Earth from deep space, triggering a chain of events that forces humanity to question everything it knows.",
        poster:
            "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1800&q=85"
    },

    {
        id: 102,
        title: "Beyond The Horizon",
        type: "series",
        year: 2026,
        duration: "2 Seasons",
        rating: 9.1,
        age: "13+",
        quality: "4K",
        eyebrow: "STREAMBOX ORIGINAL",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        description:
            "A crew of explorers crosses the boundaries of known space and discovers something that was never meant to be found.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=1800&q=85"
    },

    {
        id: 103,
        title: "Neon Eclipse",
        type: "anime",
        year: 2026,
        duration: "24 Episodes",
        rating: 9.0,
        age: "13+",
        quality: "4K",
        eyebrow: "FAN FAVORITE",
        genres: ["Anime", "Action", "Cyberpunk"],
        description:
            "In a city powered by artificial memories, a young hacker discovers a hidden system capable of rewriting reality.",
        poster:
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85"
    },

    {
        id: 104,
        title: "The Deep Blue",
        type: "documentary",
        year: 2026,
        duration: "1h 42m",
        rating: 8.9,
        age: "7+",
        quality: "4K",
        eyebrow: "NEW DOCUMENTARY",
        genres: ["Documentary", "Nature", "Science"],
        description:
            "An extraordinary journey beneath the surface of the world's oceans reveals ecosystems few humans have ever witnessed.",
        poster:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85"
    }
];


/* =========================================================
   MOVIES
   ========================================================= */

const movies = [

    {
        id: 1,
        title: "The Last Signal",
        type: "movie",
        year: 2026,
        duration: "2h 14m",
        rating: 8.7,
        genres: ["Sci-Fi", "Thriller", "Mystery"],
        description:
            "A mysterious signal from deep space changes the future of humanity.",
        poster:
            "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
        director: "Elias Morgan",
        cast: "Daniel Reed, Maya Cole, Aaron Blake",
        language: "English",
        popularity: 98,
        releaseDate: "2026-08-15",
        isNew: true,
        isTrending: true
    },

    {
        id: 2,
        title: "Shadow Protocol",
        type: "movie",
        year: 2026,
        duration: "2h 03m",
        rating: 8.4,
        genres: ["Action", "Thriller"],
        description:
            "A former intelligence operative uncovers a classified program that puts millions at risk.",
        poster:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=80",
        director: "Victor Hayes",
        cast: "Chris Stone, Elena Ward, Marcus Lee",
        language: "English",
        popularity: 94,
        releaseDate: "2026-07-29",
        isNew: true,
        isTrending: true
    },

    {
        id: 3,
        title: "Midnight City",
        type: "movie",
        year: 2025,
        duration: "1h 56m",
        rating: 8.1,
        genres: ["Crime", "Drama", "Thriller"],
        description:
            "One night. Three strangers. One city hiding a dangerous secret.",
        poster:
            "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
        director: "James Carter",
        cast: "Ryan Cole, Sophie Miles, Eric Grant",
        language: "English",
        popularity: 91,
        releaseDate: "2025-11-22",
        isTrending: true
    },

    {
        id: 4,
        title: "Zero Gravity",
        type: "movie",
        year: 2025,
        duration: "2h 08m",
        rating: 8.6,
        genres: ["Sci-Fi", "Adventure"],
        description:
            "A deep-space rescue mission becomes humanity's most dangerous journey.",
        poster:
            "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1600&q=80",
        director: "Nolan Brooks",
        cast: "James Ford, Olivia Ray, Kevin Stone",
        language: "English",
        popularity: 89,
        releaseDate: "2025-08-03"
    },

    {
        id: 5,
        title: "Final Frame",
        type: "movie",
        year: 2025,
        duration: "1h 49m",
        rating: 7.9,
        genres: ["Mystery", "Drama"],
        description:
            "A photographer finds a series of impossible images hidden inside an old camera.",
        poster:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
        director: "Rachel Moore",
        cast: "Evan Hall, Nina West, Daniel Stone",
        language: "English",
        popularity: 84,
        releaseDate: "2025-09-16"
    },

    {
        id: 6,
        title: "After The Storm",
        type: "movie",
        year: 2024,
        duration: "2h 01m",
        rating: 8.3,
        genres: ["Drama", "Romance"],
        description:
            "Two strangers rebuild their lives after a storm changes their hometown forever.",
        poster:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
        director: "Mia Anderson",
        cast: "Liam Scott, Emma Rose, Daniel King",
        language: "English",
        popularity: 78,
        releaseDate: "2024-06-10"
    },

    {
        id: 7,
        title: "Velocity",
        type: "movie",
        year: 2026,
        duration: "1h 58m",
        rating: 8.2,
        genres: ["Action", "Racing"],
        description:
            "A street racer gets one final chance to prove himself on the world's most dangerous track.",
        poster:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
        director: "Marcus Ford",
        cast: "Alex Kane, Noah Blake, Sara Quinn",
        language: "English",
        popularity: 87,
        releaseDate: "2026-08-29",
        isNew: true,
        isTrending: true
    },

    {
        id: 8,
        title: "The Silent Room",
        type: "movie",
        year: 2024,
        duration: "1h 42m",
        rating: 8.8,
        genres: ["Horror", "Mystery"],
        description:
            "A scientist enters an abandoned facility where sound itself appears to have disappeared.",
        poster:
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1600&q=80",
        director: "Oliver Reed",
        cast: "Tom Ellis, Clara White, Ben Ford",
        language: "English",
        popularity: 86,
        releaseDate: "2024-10-31",
        isTrending: true
    },

    {
        id: 9,
        title: "Parallel",
        type: "movie",
        year: 2025,
        duration: "2h 11m",
        rating: 8.5,
        genres: ["Sci-Fi", "Drama"],
        description:
            "A physicist discovers another version of himself living just one decision ahead.",
        poster:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?auto=format&fit=crop&w=1600&q=80",
        director: "Lucas Stone",
        cast: "Ethan Moore, Lily Rose, Mark Dean",
        language: "English",
        popularity: 83,
        releaseDate: "2025-04-18"
    },

    {
        id: 10,
        title: "Code Red",
        type: "movie",
        year: 2026,
        duration: "1h 52m",
        rating: 8.0,
        genres: ["Action", "Tech", "Thriller"],
        description:
            "A software engineer discovers a hidden backdoor inside critical infrastructure.",
        poster:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
        director: "Ryan Cole",
        cast: "Michael Lane, Zoe Parker, James Hill",
        language: "English",
        popularity: 90,
        releaseDate: "2026-08-04",
        isNew: true
    },

    {
        id: 11,
        title: "Ocean's Edge",
        type: "movie",
        year: 2025,
        duration: "1h 47m",
        rating: 8.9,
        genres: ["Adventure", "Drama", "Nature"],
        description:
            "A diver searches for a missing research vessel at the edge of an uncharted ocean zone.",
        poster:
            "https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
        director: "Sarah Dean",
        cast: "Daniel Hayes, Grace Stone, Noah Ray",
        language: "English",
        popularity: 88,
        releaseDate: "2025-12-07"
    },

    {
        id: 12,
        title: "Echoes",
        type: "movie",
        year: 2024,
        duration: "1h 38m",
        rating: 7.8,
        genres: ["Drama", "Mystery"],
        description:
            "A writer begins receiving letters from someone who appears to know his future.",
        poster:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
        director: "Daniel Moore",
        cast: "David Stone, Emma Cole, Peter Ray",
        language: "English",
        popularity: 75,
        releaseDate: "2024-03-20"
    }
];


/* =========================================================
   SERIES
   ========================================================= */

const series = [

    {
        id: 201,
        title: "Beyond The Horizon",
        type: "series",
        year: 2026,
        duration: "2 Seasons",
        rating: 9.1,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        description:
            "A crew of explorers crosses the boundaries of known space.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=1600&q=80",
        director: "Andrew Blake",
        cast: "Ryan West, Nina Ford, Leo Miles",
        language: "English",
        popularity: 99,
        releaseDate: "2026-08-20",
        isTrending: true,
        isNew: true,
        seasons: 2,
        episodes: 18
    },

    {
        id: 202,
        title: "Black Circuit",
        type: "series",
        year: 2025,
        duration: "3 Seasons",
        rating: 8.8,
        genres: ["Crime", "Tech", "Thriller"],
        description:
            "An elite cybersecurity team uncovers a global digital conspiracy.",
        poster:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
        director: "Ethan Black",
        cast: "James Ray, Olivia West, Mark Cole",
        language: "English",
        popularity: 95,
        releaseDate: "2025-09-10",
        isTrending: true,
        seasons: 3,
        episodes: 28
    },

    {
        id: 203,
        title: "The Archive",
        type: "series",
        year: 2024,
        duration: "2 Seasons",
        rating: 8.5,
        genres: ["Mystery", "Drama"],
        description:
            "A historian discovers an archive containing records of events that have not happened yet.",
        poster:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
        director: "Maya Brooks",
        cast: "Daniel King, Clara Miles, Evan Reed",
        language: "English",
        popularity: 87,
        releaseDate: "2024-09-06",
        seasons: 2,
        episodes: 20
    },

    {
        id: 204,
        title: "Red District",
        type: "series",
        year: 2025,
        duration: "1 Season",
        rating: 8.2,
        genres: ["Crime", "Drama"],
        description:
            "A detective returns to the district where his career began.",
        poster:
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
        director: "Thomas Reed",
        cast: "Alex Morgan, Sarah Cole, Leo Grant",
        language: "English",
        popularity: 82,
        releaseDate: "2025-02-12",
        seasons: 1,
        episodes: 8
    },

    {
        id: 205,
        title: "Origin Point",
        type: "series",
        year: 2026,
        duration: "1 Season",
        rating: 8.9,
        genres: ["Sci-Fi", "Mystery"],
        description:
            "Researchers discover a location where time appears to move differently.",
        poster:
            "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1534791547706-8b93bdc8c6f4?auto=format&fit=crop&w=1600&q=80",
        director: "Helen Moore",
        cast: "Ryan Blake, Emma Hill, Noah Dean",
        language: "English",
        popularity: 93,
        releaseDate: "2026-07-01",
        isNew: true,
        isTrending: true,
        seasons: 1,
        episodes: 10
    },

    {
        id: 206,
        title: "Northline",
        type: "series",
        year: 2024,
        duration: "4 Seasons",
        rating: 8.4,
        genres: ["Drama", "Adventure"],
        description:
            "A remote community fights to survive through a decade of extreme winters.",
        poster:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&w=1600&q=80",
        director: "John Ellis",
        cast: "Michael Ray, Nina Stone, James Ford",
        language: "English",
        popularity: 80,
        releaseDate: "2024-01-16",
        seasons: 4,
        episodes: 36
    }
];


/* =========================================================
   ANIME
   ========================================================= */

const anime = [

    {
        id: 301,
        title: "Neon Eclipse",
        type: "anime",
        year: 2026,
        duration: "24 Episodes",
        rating: 9.0,
        genres: ["Anime", "Action", "Cyberpunk"],
        description:
            "A young hacker discovers a hidden system capable of rewriting reality.",
        poster:
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
        director: "Kaito Mori",
        cast: "Ren Ito, Aya Sato, Ken Watanabe",
        language: "Japanese",
        popularity: 97,
        releaseDate: "2026-08-18",
        isTrending: true,
        isNew: true
    },

    {
        id: 302,
        title: "Skybound",
        type: "anime",
        year: 2025,
        duration: "36 Episodes",
        rating: 8.8,
        genres: ["Anime", "Adventure", "Fantasy"],
        description:
            "A young pilot joins a legendary crew searching for the floating kingdom.",
        poster:
            "https://images.unsplash.com/photo-1560258018-c7db510c5c33?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
        director: "Hiro Tanaka",
        cast: "Kai Ito, Mira Kato, Jun Rei",
        language: "Japanese",
        popularity: 92,
        releaseDate: "2025-10-04",
        isTrending: true
    },

    {
        id: 303,
        title: "Soul Forge",
        type: "anime",
        year: 2024,
        duration: "48 Episodes",
        rating: 8.9,
        genres: ["Anime", "Action", "Fantasy"],
        description:
            "Warriors capable of transforming their memories into weapons protect the final city.",
        poster:
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
        director: "Yuki Sora",
        cast: "Ren Kai, Hana Mori, Taro Shin",
        language: "Japanese",
        popularity: 90,
        releaseDate: "2024-08-12"
    },

    {
        id: 304,
        title: "Digital Ronin",
        type: "anime",
        year: 2025,
        duration: "12 Episodes",
        rating: 8.5,
        genres: ["Anime", "Cyberpunk", "Action"],
        description:
            "A wandering warrior wakes in a futuristic city controlled by artificial intelligence.",
        poster:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
        director: "Akira Noda",
        cast: "Shin Ito, Mei Kato, Ren Mori",
        language: "Japanese",
        popularity: 86,
        releaseDate: "2025-06-20"
    },

    {
        id: 305,
        title: "Moonlit Academy",
        type: "anime",
        year: 2026,
        duration: "13 Episodes",
        rating: 8.3,
        genres: ["Anime", "Romance", "Fantasy"],
        description:
            "Students at a mysterious academy discover that every dream they have becomes real.",
        poster:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
        director: "Mika Ren",
        cast: "Aiko Han, Sora Lee, Ken Yu",
        language: "Japanese",
        popularity: 84,
        releaseDate: "2026-05-18",
        isNew: true
    },

    {
        id: 306,
        title: "Star Hunters",
        type: "anime",
        year: 2023,
        duration: "72 Episodes",
        rating: 9.2,
        genres: ["Anime", "Adventure", "Action"],
        description:
            "A group of young explorers travels across galaxies in search of legendary worlds.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=1600&q=80",
        director: "Riku Arai",
        cast: "Ken Ito, Hana Rei, Sho Mori",
        language: "Japanese",
        popularity: 96,
        releaseDate: "2023-09-14",
        isTrending: true
    }
];


/* =========================================================
   DOCUMENTARIES
   ========================================================= */

const documentaries = [

    {
        id: 401,
        title: "The Deep Blue",
        type: "documentary",
        year: 2026,
        duration: "1h 42m",
        rating: 8.9,
        genres: ["Documentary", "Nature", "Science"],
        description:
            "An extraordinary journey beneath the world's oceans.",
        poster:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        director: "Rachel Stone",
        cast: "David Atten",
        language: "English",
        popularity: 93,
        releaseDate: "2026-08-01",
        isNew: true
    },

    {
        id: 402,
        title: "Inside The Machine",
        type: "documentary",
        year: 2025,
        duration: "1h 35m",
        rating: 8.7,
        genres: ["Documentary", "Technology", "Science"],
        description:
            "A journey through the technology behind modern artificial intelligence.",
        poster:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
        director: "Daniel Brooks",
        cast: "Various",
        language: "English",
        popularity: 91,
        releaseDate: "2025-07-10",
        isTrending: true
    },

    {
        id: 403,
        title: "Planet Earth: Beyond",
        type: "documentary",
        year: 2024,
        duration: "2h 02m",
        rating: 9.3,
        genres: ["Documentary", "Nature"],
        description:
            "A cinematic exploration of some of the most remote environments on Earth.",
        poster:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
        director: "James Green",
        cast: "Narrated",
        language: "English",
        popularity: 95,
        releaseDate: "2024-02-13"
    },

    {
        id: 404,
        title: "The Human Code",
        type: "documentary",
        year: 2025,
        duration: "1h 28m",
        rating: 8.5,
        genres: ["Documentary", "Psychology", "Science"],
        description:
            "Scientists explore the relationship between human behavior and modern technology.",
        poster:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1600&q=80",
        director: "Helen Ford",
        cast: "Various",
        language: "English",
        popularity: 81,
        releaseDate: "2025-05-02"
    },

    {
        id: 405,
        title: "Inside The Cosmos",
        type: "documentary",
        year: 2026,
        duration: "1h 54m",
        rating: 9.0,
        genres: ["Documentary", "Space", "Science"],
        description:
            "The latest discoveries reshaping our understanding of the universe.",
        poster:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=1600&q=80",
        director: "Thomas Ray",
        cast: "Various",
        language: "English",
        popularity: 94,
        releaseDate: "2026-07-26",
        isNew: true
    },

    {
        id: 406,
        title: "Cities After Dark",
        type: "documentary",
        year: 2024,
        duration: "1h 21m",
        rating: 8.0,
        genres: ["Documentary", "Travel", "Culture"],
        description:
            "A nighttime journey through six of the world's most fascinating cities.",
        poster:
            "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
        director: "Nora Blake",
        cast: "Various",
        language: "English",
        popularity: 77,
        releaseDate: "2024-06-18"
    }
];


/* =========================================================
   SHORT FILMS
   ========================================================= */

const shortFilms = [

    {
        id: 501,
        title: "Five Minutes",
        type: "short",
        year: 2026,
        duration: "12m",
        rating: 8.4,
        genres: ["Short", "Drama"],
        description:
            "Two strangers have exactly five minutes to change each other's lives.",
        poster:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
        director: "Maya Collins",
        cast: "Evan West, Lily Stone",
        language: "English",
        popularity: 81,
        releaseDate: "2026-08-22",
        isNew: true
    },

    {
        id: 502,
        title: "The Elevator",
        type: "short",
        year: 2025,
        duration: "9m",
        rating: 8.1,
        genres: ["Short", "Thriller"],
        description:
            "An ordinary elevator ride becomes something no one expected.",
        poster:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
        director: "Ryan Cole",
        cast: "David Ray, Emma Lane",
        language: "English",
        popularity: 74,
        releaseDate: "2025-12-01"
    },

    {
        id: 503,
        title: "One More Day",
        type: "short",
        year: 2024,
        duration: "15m",
        rating: 8.7,
        genres: ["Short", "Drama", "Romance"],
        description:
            "A letter arrives one day after it was supposed to change everything.",
        poster:
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
        director: "Sarah Miles",
        cast: "Noah West, Anna Rose",
        language: "English",
        popularity: 85,
        releaseDate: "2024-11-17"
    },

    {
        id: 504,
        title: "Offline",
        type: "short",
        year: 2026,
        duration: "11m",
        rating: 8.6,
        genres: ["Short", "Technology", "Drama"],
        description:
            "A programmer disconnects from the internet for 24 hours and discovers something unexpected.",
        poster:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
        backdrop:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
        director: "Alex Stone",
        cast: "Daniel Reed",
        language: "English",
        popularity: 88,
        releaseDate: "2026-08-10",
        isNew: true
    }
];


/* =========================================================
   COMBINED CATALOG
   ========================================================= */

const allContent = [
    ...movies,
    ...series,
    ...anime,
    ...documentaries,
    ...shortFilms
];


/* =========================================================
   GENRES
   ========================================================= */

const genres = [
    "Action",
    "Adventure",
    "Anime",
    "Comedy",
    "Crime",
    "Cyberpunk",
    "Documentary",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Nature",
    "Romance",
    "Sci-Fi",
    "Short",
    "Technology",
    "Thriller"
];


/* =========================================================
   DEMO CONTINUE WATCHING
   ========================================================= */

const continueWatching = [
    {
        ...series[0],
        progress: 72,
        remaining: "18m left"
    },

    {
        ...movies[2],
        progress: 46,
        remaining: "54m left"
    },

    {
        ...anime[1],
        progress: 81,
        remaining: "6m left"
    },

    {
        ...documentaries[1],
        progress: 38,
        remaining: "42m left"
    }
];


/* =========================================================
   DEMO WATCH HISTORY
   ========================================================= */

const watchHistory = [
    {
        ...movies[0],
        watchedAt: "Today"
    },

    {
        ...series[1],
        watchedAt: "Yesterday"
    },

    {
        ...anime[2],
        watchedAt: "2 days ago"
    },

    {
        ...movies[8],
        watchedAt: "4 days ago"
    }
];


/* =========================================================
   DEMO MY LIST
   ========================================================= */

const defaultMyList = [
    movies[3],
    series[4],
    anime[0],
    documentaries[4]
];


/* =========================================================
   RECOMMENDATION SEEDS
   ========================================================= */

const recommendationSeeds = {

    sciFi: [
        movies[0],
        movies[3],
        movies[8],
        series[0],
        series[4],
        documentaries[4]
    ],

    thriller: [
        movies[0],
        movies[1],
        movies[2],
        movies[7],
        series[1],
        movies[9]
    ],

    anime: [
        anime[0],
        anime[1],
        anime[2],
        anime[3],
        anime[4],
        anime[5]
    ],

    drama: [
        movies[2],
        movies[5],
        movies[8],
        series[2],
        series[5],
        shortFilms[2]
    ],

    technology: [
        movies[9],
        series[1],
        anime[3],
        documentaries[1],
        documentaries[3],
        shortFilms[3]
    ]

};


/* =========================================================
   CONTENT HELPERS
   ========================================================= */

function getContentById(id) {
    return allContent.find(
        item => Number(item.id) === Number(id)
    );
}


function getContentByType(type) {
    return allContent.filter(
        item => item.type === type
    );
}


function getTrendingContent(limit = 10) {
    return allContent
        .filter(item => item.isTrending)
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, limit);
}


function getNewReleases(limit = 10) {
    return allContent
        .filter(item => item.isNew)
        .sort(
            (a, b) =>
                new Date(b.releaseDate) -
                new Date(a.releaseDate)
        )
        .slice(0, limit);
}


function getTopRated(limit = 10) {
    return [...allContent]
        .sort(
            (a, b) => b.rating - a.rating
        )
        .slice(0, limit);
}


function getPopularMovies(limit = 10) {
    return movies
        .slice()
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, limit);
}


function getPopularSeries(limit = 10) {
    return series
        .slice()
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, limit);
}


function getPopularAnime(limit = 10) {
    return anime
        .slice()
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, limit);
}


function getPopularDocumentaries(limit = 10) {
    return documentaries
        .slice()
        .sort(
            (a, b) => b.popularity - a.popularity
        )
        .slice(0, limit);
}


function searchContent(query) {

    const normalizedQuery =
        String(query || "")
            .trim()
            .toLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return allContent
        .filter(item => {

            const searchableText = [
                item.title,
                item.type,
                item.year,
                item.description,
                ...(item.genres || []),
                item.director,
                item.cast
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                normalizedQuery
            );
        })
        .sort(
            (a, b) => {

                const aExact =
                    a.title
                        .toLowerCase()
                        .startsWith(normalizedQuery);

                const bExact =
                    b.title
                        .toLowerCase()
                        .startsWith(normalizedQuery);

                if (aExact && !bExact) return -1;
                if (!aExact && bExact) return 1;

                return b.popularity - a.popularity;
            }
        );
}


/* =========================================================
   EXPORT DATA FOR app.js
   ========================================================= */

window.StreamBoxData = {
    heroContent,
    movies,
    series,
    anime,
    documentaries,
    shortFilms,
    allContent,
    genres,
    continueWatching,
    watchHistory,
    defaultMyList,
    recommendationSeeds,

    getContentById,
    getContentByType,
    getTrendingContent,
    getNewReleases,
    getTopRated,
    getPopularMovies,
    getPopularSeries,
    getPopularAnime,
    getPopularDocumentaries,
    searchContent
};
