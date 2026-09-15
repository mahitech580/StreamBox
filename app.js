/* =========================================================
   STREAMBOX
   Main Application Controller
   HTML + CSS + JavaScript + React.js
   ========================================================= */

"use strict";

/* =========================================================
   REACT REFERENCES
   ========================================================= */

const {
    createElement: h,
    useState,
    useEffect,
    useMemo
} = React;


/* =========================================================
   GLOBAL DATA
   ========================================================= */

const SB = window.StreamBoxData;

if (!SB) {
    throw new Error(
        "StreamBoxData was not found. Make sure data.js loads before app.js."
    );
}


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const STORAGE_KEYS = {
    list: "streambox_my_list",
    history: "streambox_watch_history",
    progress: "streambox_progress",
    profile: "streambox_profile",
    settings: "streambox_settings",
    notifications: "streambox_notifications",
    notice: "streambox_notice_seen"
};


const defaultSettings = {
    autoplay: true,
    previews: false,
    videoQuality: "auto",
    dataUsage: "standard",
    newReleases: true,
    recommendations: true,
    personalized: true,
    displayName: "Mahendra",
    email: "user@example.com"
};


const state = {
    currentPage: "home",
    currentContent: null,
    currentHeroIndex: 0,
    selectedProfile: "mahendra",
    searchQuery: "",
    searchResults: [],
    myList: [],
    watchHistory: [],
    progress: {},
    settings: {},
    playerContent: null,
    toastTimer: null
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}


function $$(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}


function createElementFromHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function loadJSON(key, fallback) {

    try {
        const stored = localStorage.getItem(key);

        if (!stored) {
            return fallback;
        }

        return JSON.parse(stored);

    } catch (error) {

        console.warn(
            `Unable to read localStorage key: ${key}`,
            error
        );

        return fallback;
    }
}


function saveJSON(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.warn(
            `Unable to save localStorage key: ${key}`,
            error
        );
    }
}


function removeStorage(key) {

    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn(error);
    }
}


/* =========================================================
   STATE INITIALIZATION
   ========================================================= */

function initializeState() {

    state.myList = loadJSON(
        STORAGE_KEYS.list,
        SB.defaultMyList
    );

    state.watchHistory = loadJSON(
        STORAGE_KEYS.history,
        SB.watchHistory
    );

    state.progress = loadJSON(
        STORAGE_KEYS.progress,
        createDefaultProgress()
    );

    state.settings = {
        ...defaultSettings,
        ...loadJSON(
            STORAGE_KEYS.settings,
            {}
        )
    };

    state.selectedProfile =
        localStorage.getItem(
            STORAGE_KEYS.profile
        ) || "mahendra";
}


function createDefaultProgress() {

    const progress = {};

    SB.continueWatching.forEach(item => {

        progress[item.id] = {
            progress: item.progress,
            remaining: item.remaining
        };

    });

    return progress;
}


/* =========================================================
   CONTENT HELPERS
   ========================================================= */

function getPoster(content) {

    if (!content) {
        return "";
    }

    return content.poster || "";
}


function getBackdrop(content) {

    if (!content) {
        return "";
    }

    return content.backdrop || content.poster || "";
}


function normalizeContent(content) {

    return {
        ...content,
        poster: getPoster(content),
        backdrop: getBackdrop(content),
        genres: content.genres || []
    };
}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function attachImageFallbacks(root = document) {

    $$("img", root).forEach(img => {

        if (img.dataset.fallbackAttached) {
            return;
        }

        img.dataset.fallbackAttached = "true";

        img.addEventListener(
            "error",
            () => {

                img.removeAttribute("src");

                img.style.background =
                    "linear-gradient(135deg, #252a34, #101218)";

            },
            { once: true }
        );

    });
}


/* =========================================================
   REACT CARD COMPONENT
   ========================================================= */

function ContentCard({
    content,
    compact = false,
    showProgress = false
}) {

    const item = normalizeContent(content);

    const progress =
        state.progress[item.id]?.progress ||
        0;

    const isInList =
        state.myList.some(
            entry =>
                Number(entry.id) ===
                Number(item.id)
        );

    const badge =
        item.isNew
            ? "NEW"
            : item.isTrending
                ? "TRENDING"
                : null;

    function handleDetails(event) {

        event.preventDefault();
        event.stopPropagation();

        openDetails(item);
    }


    function handlePlay(event) {

        event.preventDefault();
        event.stopPropagation();

        openPlayer(item);
    }


    function handleList(event) {

        event.preventDefault();
        event.stopPropagation();

        toggleMyList(item);
    }


    return h(
        "article",
        {
            className:
                `content-card${compact ? " compact" : ""}`,
            onClick: handleDetails,
            tabIndex: 0,
            role: "button",
            "aria-label":
                `Open ${item.title}`
        },

        h(
            "div",
            {
                className: "poster-wrapper"
            },

            h(
                "img",
                {
                    className: "content-poster",
                    src: item.poster,
                    alt: item.title,
                    loading: "lazy"
                }
            ),

            h(
                "div",
                {
                    className: "poster-gradient"
                }
            ),

            badge
                ? h(
                    "span",
                    {
                        className: "card-top-badge"
                    },
                    badge
                )
                : null,

            h(
                "div",
                {
                    className: "card-rating"
                },

                h(
                    "span",
                    null,
                    "★"
                ),

                h(
                    "span",
                    null,
                    item.rating.toFixed(1)
                )
            ),

            h(
                "div",
                {
                    className: "card-hover-actions"
                },

                h(
                    "button",
                    {
                        type: "button",
                        className: "card-action play",
                        title: "Play",
                        onClick: handlePlay
                    },
                    "▶"
                ),

                h(
                    "button",
                    {
                        type: "button",
                        className: "card-action",
                        title:
                            isInList
                                ? "Remove from My List"
                                : "Add to My List",
                        onClick: handleList
                    },
                    isInList ? "✓" : "+"
                ),

                h(
                    "button",
                    {
                        type: "button",
                        className: "card-action",
                        title: "More information",
                        onClick: handleDetails
                    },
                    "i"
                )
            ),

            showProgress && progress > 0
                ? h(
                    "div",
                    {
                        className: "progress-container"
                    },

                    h(
                        "div",
                        {
                            className: "progress-bar",
                            style: {
                                width:
                                    `${Math.min(
                                        100,
                                        progress
                                    )}%`
                            }
                        }
                    )
                )
                : null
        ),

        h(
            "div",
            {
                className: "card-information"
            },

            h(
                "h3",
                {
                    className: "card-title",
                    title: item.title
                },
                item.title
            ),

            h(
                "div",
                {
                    className: "card-meta"
                },

                h(
                    "span",
                    null,
                    item.year
                ),

                h(
                    "span",
                    null,
                    item.duration
                ),

                h(
                    "span",
                    null,
                    formatType(item.type)
                )
            ),

            h(
                "div",
                {
                    className: "card-genre"
                },
                item.genres.slice(0, 2).join(" • ")
            )
        )
    );
}


/* =========================================================
   REACT ROW COMPONENT
   ========================================================= */

function ContentRow({
    items = [],
    compact = false,
    showProgress = false
}) {

    return h(
        React.Fragment,
        null,

        ...items.map(
            item =>
                h(
                    ContentCard,
                    {
                        key: item.id,
                        content: item,
                        compact,
                        showProgress
                    }
                )
        )
    );
}


/* =========================================================
   REACT CATALOG COMPONENT
   ========================================================= */

function CatalogGrid({
    items = []
}) {

    if (!items.length) {

        return h(
            "div",
            {
                className: "empty-state",
                style: {
                    gridColumn: "1 / -1"
                }
            },

            h(
                "div",
                {
                    className: "empty-state-icon"
                },
                "⌕"
            ),

            h(
                "h2",
                null,
                "No content found"
            ),

            h(
                "p",
                null,
                "Try another search or filter."
            )
        );
    }

    return h(
        React.Fragment,
        null,

        ...items.map(
            item =>
                h(
                    ContentCard,
                    {
                        key: item.id,
                        content: item
                    }
                )
        )
    );
}


/* =========================================================
   REACT RENDER HELPERS
   ========================================================= */

function renderReactInto(
    selector,
    component
) {

    const element = $(selector);

    if (!element) {
        return;
    }

    if (!element.__reactRoot) {

        element.__reactRoot =
            ReactDOM.createRoot(element);
    }

    element.__reactRoot.render(
        component
    );
}


/* =========================================================
   RENDER HOME ROWS
   ========================================================= */

function renderHomeRows() {

    renderReactInto(
        "#trending-row",
        h(
            ContentRow,
            {
                items:
                    SB.getTrendingContent(10)
            }
        )
    );


    renderReactInto(
        "#continue-row",
        h(
            ContentRow,
            {
                items:
                    SB.continueWatching,
                showProgress: true
            }
        )
    );


    renderReactInto(
        "#popular-movies-row",
        h(
            ContentRow,
            {
                items:
                    SB.getPopularMovies(10)
            }
        )
    );


    renderReactInto(
        "#popular-series-row",
        h(
            ContentRow,
            {
                items:
                    SB.getPopularSeries(10)
            }
        )
    );


    renderReactInto(
        "#anime-row",
        h(
            ContentRow,
            {
                items:
                    SB.getPopularAnime(10)
            }
        )
    );


    renderReactInto(
        "#recommendation-row",
        h(
            ContentRow,
            {
                items:
                    getRecommendations(10)
            }
        )
    );


    renderReactInto(
        "#top-rated-row",
        h(
            ContentRow,
            {
                items:
                    SB.getTopRated(10)
            }
        )
    );


    renderReactInto(
        "#new-releases-row",
        h(
            ContentRow,
            {
                items:
                    SB.getNewReleases(10)
            }
        )
    );
}


/* =========================================================
   RECOMMENDATION ENGINE
   ========================================================= */

function getRecommendations(limit = 10) {

    const watched =
        state.watchHistory || [];

    const genreFrequency =
        {};

    watched.forEach(item => {

        (item.genres || [])
            .forEach(genre => {

                const normalized =
                    genre.toLowerCase();

                genreFrequency[normalized] =
                    (genreFrequency[normalized] || 0) + 1;
            });
    });


    const favorites =
        Object.entries(
            genreFrequency
        )
            .sort(
                (a, b) => b[1] - a[1]
            )
            .slice(0, 4)
            .map(
                ([genre]) => genre
            );


    let recommendations = [];


    favorites.forEach(genre => {

        const matches =
            SB.allContent.filter(
                item =>
                    item.genres.some(
                        itemGenre =>
                            itemGenre
                                .toLowerCase() ===
                            genre
                    )
            );

        recommendations.push(...matches);
    });


    if (!recommendations.length) {

        recommendations = [
            ...SB.getTopRated(20)
        ];
    }


    const seenIds =
        new Set(
            watched.map(
                item => Number(item.id)
            )
        );


    const unique =
        recommendations.filter(
            (item, index, array) =>
                !seenIds.has(
                    Number(item.id)
                ) &&
                array.findIndex(
                    candidate =>
                        Number(candidate.id) ===
                        Number(item.id)
                ) === index
        );


    return unique
        .sort(
            (a, b) =>
                b.popularity -
                a.popularity
        )
        .slice(0, limit);
}


/* =========================================================
   HERO
   ========================================================= */

function renderHero(index = state.currentHeroIndex) {

    const item =
        SB.heroContent[index];

    if (!item) {
        return;
    }

    state.currentHeroIndex =
        index;

    const hero =
        $("#hero");

    if (!hero) {
        return;
    }


    hero.querySelector(
        "#hero-title"
    ).textContent =
        item.title;


    hero.querySelector(
        "#hero-eyebrow"
    ).textContent =
        item.eyebrow;


    hero.querySelector(
        "#hero-description"
    ).textContent =
        item.description;


    hero.querySelector(
        "#hero-meta"
    ).innerHTML = [
        `<span>${item.year}</span>`,
        `<span>${item.duration}</span>`,
        `<span>${item.age}</span>`,
        `<span>${item.quality}</span>`
    ].join("");


    hero.querySelector(
        "#hero-rating"
    ).innerHTML = `
        <span class="rating-star">★</span>
        <span>${item.rating.toFixed(1)}</span>
        <span class="rating-source">Viewer Rating</span>
    `;


    hero.querySelector(
        "#hero-genres"
    ).innerHTML =
        item.genres
            .map(
                genre =>
                    `<span>${escapeHTML(
                        genre
                    )}</span>`
            )
            .join("");


    const background =
        hero.querySelector(
            "#hero-background"
        );

    background.style.background = `
        linear-gradient(
            90deg,
            rgba(8,9,13,0.99) 0%,
            rgba(8,9,13,0.90) 26%,
            rgba(8,9,13,0.52) 62%,
            rgba(8,9,13,0.16) 100%
        ),
        linear-gradient(
            to top,
            #08090d 0%,
            rgba(8,9,13,0.20) 40%,
            rgba(8,9,13,0.05) 80%
        ),
        url("${item.backdrop}") center / cover no-repeat
    `;


    $$(".slide-indicator").forEach(
        (indicator, indicatorIndex) => {

            indicator.classList.toggle(
                "active",
                indicatorIndex === index
            );

        }
    );
}


/* =========================================================
   HERO AUTO ROTATION
   ========================================================= */

let heroTimer = null;


function startHeroRotation() {

    clearInterval(heroTimer);

    heroTimer =
        setInterval(
            () => {

                const next =
                    (
                        state.currentHeroIndex +
                        1
                    ) %
                    SB.heroContent.length;

                renderHero(next);

            },
            8500
        );
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(
    pageName,
    updateHash = true
) {

    const validPages = [
        "home",
        "movies",
        "series",
        "anime",
        "documentaries",
        "my-list",
        "history",
        "profile",
        "settings"
    ];


    if (!validPages.includes(pageName)) {
        pageName = "home";
    }


    state.currentPage =
        pageName;


    $$(".page-section")
        .forEach(section => {

            section.classList.toggle(
                "active",
                section.dataset.pageSection ===
                pageName
            );

        });


    $$(".nav-link")
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page ===
                pageName
            );

        });


    if (updateHash) {

        history.replaceState(
            null,
            "",
            `#${pageName}`
        );
    }


    closeMobileNavigation();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageName === "movies") {
        renderMoviesPage();
    }

    if (pageName === "series") {
        renderSeriesPage();
    }

    if (pageName === "anime") {
        renderAnimePage();
    }

    if (pageName === "documentaries") {
        renderDocumentariesPage();
    }

    if (pageName === "my-list") {
        renderMyListPage();
    }

    if (pageName === "history") {
        renderHistoryPage();
    }

    if (pageName === "profile") {
        renderProfilePage();
    }
}


function getPageFromHash() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();

    return hash || "home";
}


/* =========================================================
   MOVIES
   ========================================================= */

function renderMoviesPage() {

    const genre =
        $("#movie-genre-filter")?.value ||
        "all";

    const sort =
        $("#movie-sort")?.value ||
        "popular";

    let filtered =
        SB.movies.filter(
            movie => {

                if (
                    genre === "all"
                ) {
                    return true;
                }

                return movie.genres
                    .some(
                        itemGenre =>
                            itemGenre
                                .toLowerCase() ===
                            genre.toLowerCase()
                    );
            }
        );


    filtered =
        sortContent(
            filtered,
            sort
        );


    renderReactInto(
        "#movies-grid",
        h(
            CatalogGrid,
            {
                items: filtered
            }
        )
    );
}


/* =========================================================
   SERIES
   ========================================================= */

function renderSeriesPage() {

    renderReactInto(
        "#series-grid",
        h(
            CatalogGrid,
            {
                items:
                    sortContent(
                        SB.series,
                        "popular"
                    )
            }
        )
    );
}


/* =========================================================
   ANIME
   ========================================================= */

function renderAnimePage() {

    renderReactInto(
        "#anime-grid",
        h(
            CatalogGrid,
            {
                items:
                    sortContent(
                        SB.anime,
                        "popular"
                    )
            }
        )
    );
}


/* =========================================================
   DOCUMENTARIES
   ========================================================= */

function renderDocumentariesPage() {

    renderReactInto(
        "#documentaries-grid",
        h(
            CatalogGrid,
            {
                items:
                    sortContent(
                        SB.documentaries,
                        "popular"
                    )
            }
        )
    );
}


/* =========================================================
   MY LIST
   ========================================================= */

function renderMyListPage() {

    const grid =
        $("#my-list-grid");

    const empty =
        $("#my-list-empty");


    const hasItems =
        state.myList.length > 0;


    if (grid) {
        grid.style.display =
            hasItems
                ? "grid"
                : "none";
    }


    if (empty) {
        empty.style.display =
            hasItems
                ? "none"
                : "flex";
    }


    renderReactInto(
        "#my-list-grid",
        h(
            CatalogGrid,
            {
                items:
                    state.myList
            }
        )
    );
}


/* =========================================================
   HISTORY
   ========================================================= */

function renderHistoryPage() {

    const grid =
        $("#history-grid");

    const empty =
        $("#history-empty");


    const hasItems =
        state.watchHistory.length > 0;


    if (grid) {
        grid.style.display =
            hasItems
                ? "grid"
                : "none";
    }


    if (empty) {
        empty.style.display =
            hasItems
                ? "none"
                : "flex";
    }


    renderReactInto(
        "#history-grid",
        h(
            CatalogGrid,
            {
                items:
                    state.watchHistory
            }
        )
    );
}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfilePage() {

    const watchedCount =
        $("#profile-watched-count");

    const listCount =
        $("#profile-list-count");

    const averageRating =
        $("#profile-average-rating");

    const watchTime =
        $("#profile-watch-time");


    if (watchedCount) {
        watchedCount.textContent =
            state.watchHistory.length;
    }


    if (listCount) {
        listCount.textContent =
            state.myList.length;
    }


    if (averageRating) {

        const ratings =
            state.watchHistory
                .map(item => Number(item.rating))
                .filter(Boolean);


        const average =
            ratings.length
                ? ratings.reduce(
                    (sum, value) =>
                        sum + value,
                    0
                ) / ratings.length
                : 0;


        averageRating.textContent =
            average.toFixed(1);
    }


    if (watchTime) {

        const hours =
            state.watchHistory.length *
            2.1;

        watchTime.textContent =
            `${Math.round(hours)}h`;
    }


    const displayName =
        $("#display-name");

    const email =
        $("#email");


    if (displayName) {
        displayName.value =
            state.settings.displayName;
    }


    if (email) {
        email.value =
            state.settings.email;
    }


    updateProfileName();
}


/* =========================================================
   SORT
   ========================================================= */

function sortContent(
    items,
    sort
) {

    const result =
        [...items];


    switch (sort) {

        case "rating":

            return result.sort(
                (a, b) =>
                    b.rating -
                    a.rating
            );


        case "newest":

            return result.sort(
                (a, b) =>
                    new Date(b.releaseDate) -
                    new Date(a.releaseDate)
            );


        case "title":

            return result.sort(
                (a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
            );


        case "popular":

        default:

            return result.sort(
                (a, b) =>
                    b.popularity -
                    a.popularity
            );
    }
}


/* =========================================================
   DETAILS MODAL
   ========================================================= */

function openDetails(content) {

    const item =
        normalizeContent(content);


    state.currentContent =
        item;


    const modal =
        $("#details-modal");

    if (!modal) {
        return;
    }


    const title =
        $("#details-title");

    const backdrop =
        $("#details-backdrop");

    const poster =
        $("#details-poster");

    const type =
        $("#details-type");

    const year =
        $("#details-year");

    const duration =
        $("#details-duration");

    const rating =
        $("#details-rating-value");

    const description =
        $("#details-description");

    const genres =
        $("#details-genres");

    const director =
        $("#details-director");

    const cast =
        $("#details-cast");

    const language =
        $("#details-language");


    title.textContent =
        item.title;


    type.textContent =
        formatType(
            item.type
        );


    year.textContent =
        item.year;


    duration.textContent =
        item.duration;


    rating.textContent =
        Number(item.rating)
            .toFixed(1);


    description.textContent =
        item.description;


    director.textContent =
        item.director ||
        "—";


    cast.textContent =
        item.cast ||
        "—";


    language.textContent =
        item.language ||
        "English";


    backdrop.style.background = `
        linear-gradient(
            to top,
            #11141a 0%,
            rgba(17,20,26,0.15) 75%
        ),
        url("${item.backdrop}")
        center / cover no-repeat
    `;


    poster.innerHTML = `
        <img
            src="${escapeAttribute(item.poster)}"
            alt="${escapeAttribute(item.title)} poster"
        >
    `;


    genres.innerHTML =
        item.genres
            .map(
                genre =>
                    `<span>${escapeHTML(
                        genre
                    )}</span>`
            )
            .join("");


    const similar =
        getSimilarContent(
            item,
            6
        );


    renderReactInto(
        "#similar-row",
        h(
            ContentRow,
            {
                items: similar,
                compact: true
            }
        )
    );


    const listButton =
        $("#details-list-button");


    const isInList =
        isInMyList(item.id);


    listButton.innerHTML =
        isInList
            ? "✓ In My List"
            : "＋ My List";


    modal.classList.add(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );
}


function closeDetails() {

    const modal =
        $("#details-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

    state.currentContent =
        null;
}


/* =========================================================
   SIMILAR CONTENT
   ========================================================= */

function getSimilarContent(
    content,
    limit = 6
) {

    const sourceGenres =
        content.genres || [];


    return SB.allContent
        .filter(
            item =>
                Number(item.id) !==
                Number(content.id)
        )
        .map(
            item => {

                const overlap =
                    item.genres.filter(
                        genre =>
                            sourceGenres.includes(
                                genre
                            )
                    ).length;


                return {
                    item,
                    score:
                        overlap * 10 +
                        item.rating
                };
            }
        )
        .sort(
            (a, b) =>
                b.score -
                a.score
        )
        .slice(0, limit)
        .map(
            entry =>
                entry.item
        );
}


/* =========================================================
   PLAYER
   ========================================================= */

function openPlayer(content) {

    const item =
        normalizeContent(content);


    state.playerContent =
        item;


    const modal =
        $("#player-modal");

    const title =
        $("#player-content-title");

    const playerTitle =
        $("#player-title");

    const video =
        $("#stream-video");

    const placeholder =
        $("#video-placeholder");


    title.textContent =
        item.title;

    playerTitle.textContent =
        item.title;


    video.pause();

    video.removeAttribute(
        "src"
    );

    video.load();


    placeholder.classList.remove(
        "hidden"
    );


    modal.classList.add(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );


    addToHistory(item);
    updateContinueProgress(item, 1);
}


function closePlayer() {

    const modal =
        $("#player-modal");

    if (!modal) {
        return;
    }


    const video =
        $("#stream-video");


    video.pause();


    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );


    state.playerContent =
        null;
}


/* =========================================================
   DEMO PLAYER
   ========================================================= */

function loadDemoVideo() {

    const video =
        $("#stream-video");

    const placeholder =
        $("#video-placeholder");


    /*
     * Public MP4 demonstration video.
     * Replace this with appropriately licensed
     * content for your final deployment.
     */

    const demoURL =
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";


    video.src =
        demoURL;


    placeholder.classList.add(
        "hidden"
    );


    video.load();


    video.play()
        .catch(
            () => {
                showToast(
                    "Press play to start the demo video.",
                    "▶"
                );
            }
        );
}


/* =========================================================
   MY LIST
   ========================================================= */

function isInMyList(id) {

    return state.myList.some(
        item =>
            Number(item.id) ===
            Number(id)
    );
}


function toggleMyList(content) {

    const item =
        normalizeContent(content);


    const index =
        state.myList.findIndex(
            entry =>
                Number(entry.id) ===
                Number(item.id)
        );


    if (index >= 0) {

        state.myList.splice(
            index,
            1
        );


        showToast(
            `${item.title} removed from My List.`,
            "−"
        );

    } else {

        state.myList.unshift(
            item
        );


        showToast(
            `${item.title} added to My List.`,
            "✓"
        );
    }


    saveJSON(
        STORAGE_KEYS.list,
        state.myList
    );


    refreshDynamicUI();


    if (
        $("#details-modal")
            .classList.contains("open")
    ) {

        const button =
            $("#details-list-button");

        if (button) {

            button.innerHTML =
                isInMyList(item.id)
                    ? "✓ In My List"
                    : "＋ My List";
        }
    }
}


/* =========================================================
   WATCH HISTORY
   ========================================================= */

function addToHistory(content) {

    const item =
        normalizeContent(content);


    const filtered =
        state.watchHistory.filter(
            entry =>
                Number(entry.id) !==
                Number(item.id)
        );


    state.watchHistory = [
        item,
        ...filtered
    ].slice(0, 30);


    saveJSON(
        STORAGE_KEYS.history,
        state.watchHistory
    );
}


/* =========================================================
   WATCH PROGRESS
   ========================================================= */

function updateContinueProgress(
    content,
    progress
) {

    const item =
        normalizeContent(content);


    state.progress[item.id] = {
        progress:
            Math.min(
                100,
                Math.max(
                    0,
                    progress
                )
            ),
        remaining:
            progress >= 95
                ? "Finished"
                : "Continue watching"
    };


    saveJSON(
        STORAGE_KEYS.progress,
        state.progress
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function openSearch() {

    const overlay =
        $("#search-overlay");

    if (!overlay) {
        return;
    }


    overlay.classList.add(
        "open"
    );

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );


    const input =
        $("#search-input");


    if (input) {

        setTimeout(
            () => input.focus(),
            100
        );
    }


    document.body.classList.add(
        "no-scroll"
    );
}


function closeSearch() {

    const overlay =
        $("#search-overlay");

    if (!overlay) {
        return;
    }


    overlay.classList.remove(
        "open"
    );

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );
}


function performSearch(query) {

    const trimmed =
        String(
            query || ""
        ).trim();


    state.searchQuery =
        trimmed;


    const results =
        SB.searchContent(
            trimmed
        );


    state.searchResults =
        results;


    renderSearchResults(
        results,
        trimmed
    );
}


function renderSearchResults(
    results,
    query
) {

    const container =
        $("#search-results");


    if (!container) {
        return;
    }


    if (!query) {

        container.innerHTML = "";

        return;
    }


    if (!results.length) {

        container.innerHTML = `
            <div class="empty-state"
                 style="grid-column:1/-1">
                <div class="empty-state-icon">⌕</div>
                <h2>No results found</h2>
                <p>
                    Nothing matched
                    "${escapeHTML(query)}".
                    Try another title, genre or keyword.
                </p>
            </div>
        `;

        return;
    }


    renderReactInto(
        "#search-results",
        h(
            CatalogGrid,
            {
                items: results
            }
        )
    );
}


/* =========================================================
   FILTER CATEGORY
   ========================================================= */

function filterHomeCategory(
    category
) {

    let items;


    switch (category) {

        case "movies":
            items = SB.movies;
            break;

        case "series":
            items = SB.series;
            break;

        case "anime":
            items = SB.anime;
            break;

        case "documentary":
            items =
                SB.documentaries;
            break;

        case "shorts":
            items =
                SB.shortFilms;
            break;

        case "all":
        default:
            items =
                SB.getTrendingContent(10);
            break;
    }


    renderReactInto(
        "#trending-row",
        h(
            ContentRow,
            {
                items:
                    sortContent(
                        items,
                        "popular"
                    )
            }
        )
    );


    showToast(
        category === "all"
            ? "Showing all trending content."
            : `Showing ${formatType(category)}.`,
        "✓"
    );
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function openNotifications() {

    const panel =
        $("#notification-panel");

    if (!panel) {
        return;
    }


    closeProfileMenu();
    closeSearch();


    panel.classList.toggle(
        "open"
    );

    panel.setAttribute(
        "aria-hidden",
        String(
            !panel.classList.contains(
                "open"
            )
        )
    );
}


function markNotificationsRead() {

    $$(".notification-item")
        .forEach(
            item =>
                item.classList.remove(
                    "unread"
                )
        );


    const count =
        $("#notification-count");


    if (count) {
        count.textContent = "0";
    }


    showToast(
        "Notifications marked as read.",
        "✓"
    );
}


/* =========================================================
   PROFILE MENU
   ========================================================= */

function openProfileMenu() {

    const menu =
        $("#profile-menu");

    if (!menu) {
        return;
    }


    closeNotifications();
    closeSearch();


    menu.classList.toggle(
        "open"
    );


    menu.setAttribute(
        "aria-hidden",
        String(
            !menu.classList.contains(
                "open"
            )
        )
    );
}


function closeProfileMenu() {

    const menu =
        $("#profile-menu");


    if (!menu) {
        return;
    }


    menu.classList.remove(
        "open"
    );

    menu.setAttribute(
        "aria-hidden",
        "true"
    );
}


function closeNotifications() {

    const panel =
        $("#notification-panel");


    if (!panel) {
        return;
    }


    panel.classList.remove(
        "open"
    );

    panel.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function openMobileNavigation() {

    const navigation =
        $("#mobile-navigation");


    navigation?.classList.add(
        "open"
    );
}


function closeMobileNavigation() {

    const navigation =
        $("#mobile-navigation");


    navigation?.classList.remove(
        "open"
    );
}


/* =========================================================
   SETTINGS
   ========================================================= */

function initializeSettings() {

    const autoplay =
        $("#autoplay-toggle");

    const previews =
        $("#preview-toggle");


    if (autoplay) {
        autoplay.checked =
            Boolean(
                state.settings.autoplay
            );
    }


    if (previews) {
        previews.checked =
            Boolean(
                state.settings.previews
            );
    }


    const quality =
        $("#video-quality");

    const dataUsage =
        $("#data-usage");


    if (quality) {
        quality.value =
            state.settings.videoQuality;
    }


    if (dataUsage) {
        dataUsage.value =
            state.settings.dataUsage;
    }
}


function saveSettings() {

    const autoplay =
        $("#autoplay-toggle");

    const previews =
        $("#preview-toggle");

    const quality =
        $("#video-quality");

    const dataUsage =
        $("#data-usage");


    state.settings.autoplay =
        autoplay
            ? autoplay.checked
            : true;


    state.settings.previews =
        previews
            ? previews.checked
            : false;


    state.settings.videoQuality =
        quality
            ? quality.value
            : "auto";


    state.settings.dataUsage =
        dataUsage
            ? dataUsage.value
            : "standard";


    saveJSON(
        STORAGE_KEYS.settings,
        state.settings
    );


    showToast(
        "Playback settings saved.",
        "✓"
    );
}


function saveAccountSettings() {

    const displayName =
        $("#display-name");

    const email =
        $("#email");


    state.settings.displayName =
        displayName?.value.trim() ||
        "Mahendra";


    state.settings.email =
        email?.value.trim() ||
        "user@example.com";


    saveJSON(
        STORAGE_KEYS.settings,
        state.settings
    );


    updateProfileName();


    showToast(
        "Account settings updated.",
        "✓"
    );
}


function updateProfileName() {

    const name =
        state.settings.displayName ||
        "Mahendra";


    const profileHeader =
        $("#profile-page");


    if (profileHeader) {

        const heading =
            profileHeader.querySelector(
                ".profile-page-header h1"
            );

        if (heading) {
            heading.textContent =
                name;
        }
    }


    $(
        ".profile-menu-header strong"
    ).textContent =
        name;
}


/* =========================================================
   SETTINGS TABS
   ========================================================= */

function openSettingsTab(
    tabName
) {

    $$(".settings-tab")
        .forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.settingsTab ===
                tabName
            );

        });


    $$(".settings-panel")
        .forEach(panel => {

            panel.classList.toggle(
                "active",
                panel.dataset.settingsPanel ===
                tabName
            );

        });
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    icon = "✓"
) {

    const toast =
        $("#toast");

    const toastMessage =
        $("#toast-message");

    const toastIcon =
        $("#toast-icon");


    if (!toast) {
        return;
    }


    toastMessage.textContent =
        message;


    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        state.toastTimer
    );


    state.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2700
        );
}


/* =========================================================
   STORAGE NOTICE
   ========================================================= */

function initializeStorageNotice() {

    const notice =
        $("#storage-notice");


    if (!notice) {
        return;
    }


    const seen =
        localStorage.getItem(
            STORAGE_KEYS.notice
        );


    if (seen === "true") {

        notice.classList.add(
            "hidden"
        );

        return;
    }


    notice
        .querySelector(
            "#dismiss-storage-notice"
        )
        ?.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    STORAGE_KEYS.notice,
                    "true"
                );

                notice.classList.add(
                    "hidden"
                );

            }
        );
}


/* =========================================================
   PROFILE SELECTOR
   ========================================================= */

function openProfileSelector() {

    const selector =
        $("#profile-selector");


    selector?.classList.add(
        "open"
    );
}


function closeProfileSelector() {

    const selector =
        $("#profile-selector");


    selector?.classList.remove(
        "open"
    );
}


function selectProfile(
    profile
) {

    state.selectedProfile =
        profile;


    localStorage.setItem(
        STORAGE_KEYS.profile,
        profile
    );


    updateProfileAvatar(
        profile
    );


    closeProfileSelector();


    showToast(
        `Switched to ${formatProfileName(profile)}.`,
        "✓"
    );
}


function formatProfileName(
    profile
) {

    switch (profile) {

        case "kids":
            return "Kids";

        case "guest":
            return "Guest";

        case "mahendra":
            return "Mahendra";

        default:
            return "Profile";
    }
}


function updateProfileAvatar(
    profile
) {

    const avatars =
        $$(".profile-avatar");


    avatars.forEach(
        avatar => {

            if (
                avatar.parentElement?.classList
                    .contains("profile-option")
            ) {
                return;
            }

            avatar.textContent =
                profile === "kids"
                    ? "K"
                    : profile === "guest"
                        ? "G"
                        : "M";
        }
    );
}


/* =========================================================
   HEADER SCROLL
   ========================================================= */

function initializeHeaderScroll() {

    const header =
        $("#site-header");


    if (!header) {
        return;
    }


    const update =
        () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        };


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    update();
}


/* =========================================================
   ROW NAVIGATION
   ========================================================= */

function scrollRow(
    rowName,
    direction
) {

    const row =
        document.querySelector(
            `[data-content-row="${rowName}"]`
        );


    if (!row) {
        return;
    }


    const amount =
        row.clientWidth *
        0.8;


    row.scrollBy({
        left:
            direction === "next"
                ? amount
                : -amount,
        behavior: "smooth"
    });
}


/* =========================================================
   EVENT BINDINGS
   ========================================================= */

function bindEvents() {

    /* ---------------------------------------------
       Navigation
       --------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "a[href^='#']"
                );


            if (!link) {
                return;
            }


            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#"
            ) {
                return;
            }


            const page =
                href
                    .replace("#", "")
                    .toLowerCase();


            const pageNames = [
                "home",
                "movies",
                "series",
                "anime",
                "documentaries",
                "my-list",
                "history",
                "profile",
                "settings"
            ];


            if (
                pageNames.includes(page)
            ) {

                event.preventDefault();

                showPage(
                    page
                );
            }
        }
    );


    /* ---------------------------------------------
       Search
       --------------------------------------------- */

    $("#search-button")
        ?.addEventListener(
            "click",
            openSearch
        );


    $("#close-search")
        ?.addEventListener(
            "click",
            closeSearch
        );


    $("#search-input")
        ?.addEventListener(
            "input",
            event => {

                performSearch(
                    event.target.value
                );
            }
        );


    $("#search-submit")
        ?.addEventListener(
            "click",
            () => {

                performSearch(
                    $("#search-input")
                        .value
                );
            }
        );


    /* ---------------------------------------------
       Notifications
       --------------------------------------------- */

    $("#notification-button")
        ?.addEventListener(
            "click",
            openNotifications
        );


    $("#mark-notifications-read")
        ?.addEventListener(
            "click",
            markNotificationsRead
        );


    /* ---------------------------------------------
       Profile
       --------------------------------------------- */

    $("#profile-button")
        ?.addEventListener(
            "click",
            openProfileMenu
        );


    $("#logout-button")
        ?.addEventListener(
            "click",
            () => {

                closeProfileMenu();

                openProfileSelector();

            }
        );


    /* ---------------------------------------------
       Mobile menu
       --------------------------------------------- */

    $("#mobile-menu-button")
        ?.addEventListener(
            "click",
            openMobileNavigation
        );


    $("#close-mobile-navigation")
        ?.addEventListener(
            "click",
            closeMobileNavigation
        );


    /* ---------------------------------------------
       Hero
       --------------------------------------------- */

    $("#hero-play-button")
        ?.addEventListener(
            "click",
            () => {

                const content =
                    SB.heroContent[
                        state.currentHeroIndex
                    ];

                openPlayer(
                    content
                );
            }
        );


    $("#hero-list-button")
        ?.addEventListener(
            "click",
            () => {

                const content =
                    SB.heroContent[
                        state.currentHeroIndex
                    ];

                toggleMyList(
                    content
                );
            }
        );


    $("#hero-info-button")
        ?.addEventListener(
            "click",
            () => {

                const content =
                    SB.heroContent[
                        state.currentHeroIndex
                    ];

                openDetails(
                    content
                );
            }
        );


    $$(".slide-indicator")
        .forEach(
            indicator => {

                indicator.addEventListener(
                    "click",
                    () => {

                        renderHero(
                            Number(
                                indicator
                                    .dataset
                                    .slide
                            )
                        );

                        startHeroRotation();

                    }
                );

            }
        );


    /* ---------------------------------------------
       Category buttons
       --------------------------------------------- */

    $$(".category-pill")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        $$(".category-pill")
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );

                        button.classList.add(
                            "active"
                        );


                        filterHomeCategory(
                            button.dataset.category
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       Row arrows
       --------------------------------------------- */

    $$(
        ".row-arrow"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    scrollRow(
                        button.dataset.row,
                        button.dataset.direction
                    );

                }
            );

        }
    );


    /* ---------------------------------------------
       Genre cards
       --------------------------------------------- */

    $$(".genre-card")
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const genre =
                            card.dataset.genre;

                        openSearch();

                        const input =
                            $("#search-input");

                        input.value =
                            genre;

                        performSearch(
                            genre
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       Movie filters
       --------------------------------------------- */

    $("#movie-genre-filter")
        ?.addEventListener(
            "change",
            renderMoviesPage
        );


    $("#movie-sort")
        ?.addEventListener(
            "change",
            renderMoviesPage
        );


    /* ---------------------------------------------
       Details
       --------------------------------------------- */

    $("#close-details")
        ?.addEventListener(
            "click",
            closeDetails
        );


    $("#details-play-button")
        ?.addEventListener(
            "click",
            () => {

                if (
                    state.currentContent
                ) {

                    const content =
                        state.currentContent;

                    closeDetails();

                    openPlayer(
                        content
                    );
                }
            }
        );


    $("#details-list-button")
        ?.addEventListener(
            "click",
            () => {

                if (
                    state.currentContent
                ) {

                    toggleMyList(
                        state.currentContent
                    );
                }
            }
        );


    /* ---------------------------------------------
       Player
       --------------------------------------------- */

    $("#close-player")
        ?.addEventListener(
            "click",
            closePlayer
        );


    $("#load-demo-video")
        ?.addEventListener(
            "click",
            loadDemoVideo
        );


    $("#player-like")
        ?.addEventListener(
            "click",
            () => {

                showToast(
                    "Added to your favorites.",
                    "♥"
                );
            }
        );


    $("#player-add-list")
        ?.addEventListener(
            "click",
            () => {

                if (
                    state.playerContent
                ) {

                    toggleMyList(
                        state.playerContent
                    );
                }
            }
        );


    /* ---------------------------------------------
       Settings
       --------------------------------------------- */

    $("#save-account")
        ?.addEventListener(
            "click",
            saveAccountSettings
        );


    $("#video-quality")
        ?.addEventListener(
            "change",
            saveSettings
        );


    $("#data-usage")
        ?.addEventListener(
            "change",
            saveSettings
        );


    $("#autoplay-toggle")
        ?.addEventListener(
            "change",
            saveSettings
        );


    $("#preview-toggle")
        ?.addEventListener(
            "change",
            saveSettings
        );


    $$(".settings-tab")
        .forEach(
            tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        openSettingsTab(
                            tab.dataset.settingsTab
                        );
                    }
                );

            }
        );


    /* ---------------------------------------------
       Profiles
       --------------------------------------------- */

    $$(".profile-option")
        .forEach(
            option => {

                option.addEventListener(
                    "click",
                    () => {

                        const profile =
                            option.dataset.profile;

                        if (
                            profile === "new"
                        ) {

                            showToast(
                                "Profile creation will be added next.",
                                "+"
                            );

                            return;
                        }

                        selectProfile(
                            profile
                        );
                    }
                );

            }
        );


    /* ---------------------------------------------
       Keyboard shortcuts
       --------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT"
            ) {

                event.preventDefault();

                openSearch();
            }


            if (
                event.key === "Escape"
            ) {

                closeSearch();
                closeDetails();
                closePlayer();
                closeProfileMenu();
                closeNotifications();
                closeMobileNavigation();

            }

        }
    );


    /* ---------------------------------------------
       Outside click
       --------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    "#profile-menu, #profile-button"
                )
            ) {

                closeProfileMenu();
            }


            if (
                !event.target.closest(
                    "#notification-panel, #notification-button"
                )
            ) {

                closeNotifications();
            }

        }
    );
}


/* =========================================================
   REFRESH DYNAMIC UI
   ========================================================= */

function refreshDynamicUI() {

    renderHomeRows();

    if (
        state.currentPage === "movies"
    ) {
        renderMoviesPage();
    }

    if (
        state.currentPage === "series"
    ) {
        renderSeriesPage();
    }

    if (
        state.currentPage === "anime"
    ) {
        renderAnimePage();
    }

    if (
        state.currentPage === "documentaries"
    ) {
        renderDocumentariesPage();
    }

    if (
        state.currentPage === "my-list"
    ) {
        renderMyListPage();
    }

    if (
        state.currentPage === "history"
    ) {
        renderHistoryPage();
    }

    if (
        state.currentPage === "profile"
    ) {
        renderProfilePage();
    }

}


/* =========================================================
   FORMATTERS
   ========================================================= */

function formatType(type) {

    switch (
        String(type)
            .toLowerCase()
    ) {

        case "movie":
            return "Movie";

        case "series":
            return "Series";

        case "anime":
            return "Anime";

        case "documentary":
            return "Documentary";

        case "short":
            return "Short Film";

        default:
            return "Content";
    }
}


function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


function escapeAttribute(value) {

    return escapeHTML(
        value
    );
}


/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function initializeApp() {

    initializeState();

    initializeSettings();

    initializeStorageNotice();

    bindEvents();

    initializeHeaderScroll();

    renderHero(0);

    renderHomeRows();

    showPage(
        getPageFromHash(),
        false
    );

    updateProfileAvatar(
        state.selectedProfile
    );

    updateProfileName();

    attachImageFallbacks();

    startHeroRotation();


    /* Hide loading screen */

    setTimeout(
        () => {

            const loader =
                $("#app-loading");

            loader?.classList.add(
                "loaded"
            );

        },
        500
    );


    console.log(
        "%cStreamBox initialized successfully.",
        "color:#e50914;font-weight:700;"
    );
}


/* =========================================================
   GLOBAL ERROR HANDLING
   ========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "StreamBox error:",
            event.error || event.message
        );

    }
);


/* =========================================================
   HASH NAVIGATION
   ========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        showPage(
            getPageFromHash(),
            false
        );

    }
);


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}
