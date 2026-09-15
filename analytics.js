/* =========================================================
   STREAMBOX
   Analytics Data Connector
   Connects Python-generated JSON to the frontend
   ========================================================= */

"use strict";


/* =========================================================
   PATHS
   ========================================================= */

const ANALYTICS_URL =
    "./data/generated/analytics.json";

const RECOMMENDATIONS_URL =
    "./data/generated/recommendations.json";


/* =========================================================
   GLOBAL ANALYTICS STATE
   ========================================================= */

const streamBoxAnalytics = {

    loaded: false,

    analytics: null,

    recommendations: null,

    error: null

};


/* =========================================================
   FETCH JSON
   ========================================================= */

async function fetchJSON(url) {

    const response =
        await fetch(url, {
            cache: "no-cache"
        });

    if (!response.ok) {

        throw new Error(
            `Unable to load ${url}: HTTP ${response.status}`
        );
    }

    return response.json();
}


/* =========================================================
   LOAD PYTHON OUTPUT
   ========================================================= */

async function loadAnalyticsData() {

    try {

        const [
            analytics,
            recommendations
        ] = await Promise.all([
            fetchJSON(ANALYTICS_URL),
            fetchJSON(RECOMMENDATIONS_URL)
        ]);


        streamBoxAnalytics.analytics =
            analytics;


        streamBoxAnalytics.recommendations =
            recommendations;


        streamBoxAnalytics.loaded =
            true;


        streamBoxAnalytics.error =
            null;


        console.log(
            "StreamBox Python analytics loaded.",
            streamBoxAnalytics
        );


        dispatchAnalyticsEvent();


        updateAnalyticsUI();


        return streamBoxAnalytics;

    } catch (error) {

        streamBoxAnalytics.error =
            error;


        console.warn(
            "StreamBox analytics could not be loaded.",
            error
        );


        return null;
    }
}


/* =========================================================
   CUSTOM EVENT
   ========================================================= */

function dispatchAnalyticsEvent() {

    const event =
        new CustomEvent(
            "streambox:analytics-ready",
            {
                detail:
                    streamBoxAnalytics
            }
        );


    window.dispatchEvent(
        event
    );
}


/* =========================================================
   UPDATE PROFILE STATISTICS
   ========================================================= */

function updateAnalyticsUI() {

    const analytics =
        streamBoxAnalytics.analytics;


    if (!analytics) {
        return;
    }


    const summary =
        analytics.summary ||
        {};


    const profile =
        analytics.user_profile ||
        {};


    const totalViews =
        document.getElementById(
            "profile-watched-count"
        );


    if (totalViews) {

        totalViews.textContent =
            summary.total_views ??
            0;
    }


    const averageRating =
        document.getElementById(
            "profile-average-rating"
        );


    if (averageRating) {

        averageRating.textContent =
            Number(
                summary.average_user_rating || 0
            ).toFixed(1);
    }


    const favoriteGenres =
        profile.favorite_genres ||
        [];


    updateRecommendationDescription(
        favoriteGenres
    );


    updateAnalyticsCards(
        summary
    );
}


/* =========================================================
   RECOMMENDATION DESCRIPTION
   ========================================================= */

function updateRecommendationDescription(
    genres
) {

    const element =
        document.getElementById(
            "recommendation-description"
        );


    if (!element) {
        return;
    }


    if (!genres.length) {

        element.textContent =
            "Recommendations based on your viewing activity.";

        return;
    }


    element.textContent =
        `Based on your interest in ${genres
            .slice(0, 3)
            .join(", ")}.`;
}


/* =========================================================
   ANALYTICS CARDS
   ========================================================= */

function updateAnalyticsCards(
    summary
) {

    const completionRate =
        Number(
            summary.completion_rate || 0
        );


    const averageWatch =
        Number(
            summary.average_watch_percent || 0
        );


    const cards =
        document.querySelectorAll(
            "[data-analytics-value]"
        );


    cards.forEach(
        card => {

            const metric =
                card.dataset.analyticsValue;


            switch (metric) {

                case "completion":

                    card.textContent =
                        `${completionRate.toFixed(0)}%`;

                    break;


                case "watch":

                    card.textContent =
                        `${averageWatch.toFixed(0)}%`;

                    break;


                case "views":

                    card.textContent =
                        summary.total_views ??
                        0;

                    break;
            }
        }
    );
}


/* =========================================================
   RECOMMENDATION ACCESS
   ========================================================= */

function getPythonRecommendations() {

    if (
        !streamBoxAnalytics.loaded ||
        !streamBoxAnalytics.recommendations
    ) {

        return [];
    }


    return (
        streamBoxAnalytics
            .recommendations
            .recommendations ||
        []
    );
}


/* =========================================================
   RECOMMENDATION IDS
   ========================================================= */

function getRecommendedContentIds() {

    return getPythonRecommendations()
        .map(
            item =>
                Number(
                    item.content_id
                )
        )
        .filter(
            Number.isFinite
        );
}


/* =========================================================
   RECOMMENDATION OBJECTS
   ========================================================= */

function getRecommendedContent() {

    const ids =
        getRecommendedContentIds();


    return ids
        .map(
            id =>
                SB.getContentById(id)
        )
        .filter(Boolean);
}


/* =========================================================
   ANALYTICS SUMMARY
   ========================================================= */

function getAnalyticsSummary() {

    if (
        !streamBoxAnalytics.analytics
    ) {

        return null;
    }


    return (
        streamBoxAnalytics
            .analytics
            .summary ||
        null
    );
}


/* =========================================================
   FAVORITE GENRES
   ========================================================= */

function getFavoriteGenres() {

    const profile =
        streamBoxAnalytics
            .analytics
            ?.user_profile;


    if (!profile) {
        return [];
    }


    return profile.favorite_genres || [];
}


/* =========================================================
   CONTENT ENGAGEMENT
   ========================================================= */

function getContentEngagement() {

    return (
        streamBoxAnalytics
            .analytics
            ?.content_engagement ||
        []
    );
}


/* =========================================================
   PYTHON RECOMMENDATION SCORE
   ========================================================= */

function getRecommendationScore(
    contentId
) {

    const recommendations =
        getPythonRecommendations();


    const result =
        recommendations.find(
            item =>
                Number(item.content_id) ===
                Number(contentId)
        );


    return result
        ? Number(
            result.recommendation_score || 0
        )
        : 0;
}


/* =========================================================
   RECOMMENDATION REASON
   ========================================================= */

function getRecommendationReason(
    contentId
) {

    const recommendations =
        getPythonRecommendations();


    const result =
        recommendations.find(
            item =>
                Number(item.content_id) ===
                Number(contentId)
        );


    return result?.reason ||
        "Recommended for you";
}


/* =========================================================
   GLOBAL API
   ========================================================= */

window.StreamBoxAnalytics = {

    load:
        loadAnalyticsData,

    state:
        streamBoxAnalytics,

    getSummary:
        getAnalyticsSummary,

    getRecommendations:
        getRecommendedContent,

    getRecommendationIds:
        getRecommendedContentIds,

    getFavoriteGenres:
        getFavoriteGenres,

    getEngagement:
        getContentEngagement,

    getRecommendationScore:
        getRecommendationScore,

    getRecommendationReason:
        getRecommendationReason
};


/* =========================================================
   AUTO LOAD
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            loadAnalyticsData();
        }
    );

} else {

    loadAnalyticsData();
}
