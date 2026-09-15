/* =========================================================
   HYBRID RECOMMENDATION ENGINE
   Python recommendations + JavaScript fallback
   ========================================================= */

function getRecommendations(limit = 10) {

    /*
     * =====================================================
     * 1. PYTHON RECOMMENDATIONS
     * =====================================================
     *
     * Python-generated recommendations are preferred when
     * analytics.js has successfully loaded the JSON files.
     */

    if (
        window.StreamBoxAnalytics &&
        window.StreamBoxAnalytics.state &&
        window.StreamBoxAnalytics.state.loaded
    ) {

        const pythonRecommendations =
            window.StreamBoxAnalytics.getRecommendations();


        if (
            Array.isArray(
                pythonRecommendations
            ) &&
            pythonRecommendations.length > 0
        ) {

            return pythonRecommendations.slice(
                0,
                limit
            );
        }
    }


    /*
     * =====================================================
     * 2. JAVASCRIPT FALLBACK
     * =====================================================
     *
     * If Python analytics are unavailable, calculate
     * recommendations from the user's local watch history.
     */

    const watched =
        Array.isArray(
            state.watchHistory
        )
            ? state.watchHistory
            : [];


    const genreFrequency = {};


    watched.forEach(
        item => {

            if (
                !item ||
                !Array.isArray(
                    item.genres
                )
            ) {
                return;
            }


            item.genres.forEach(
                genre => {

                    const normalized =
                        String(
                            genre
                        )
                            .trim()
                            .toLowerCase();


                    if (!normalized) {
                        return;
                    }


                    genreFrequency[
                        normalized
                    ] =
                        (
                            genreFrequency[
                                normalized
                            ] || 0
                        ) + 1;

                }
            );
        }
    );


    const favoriteGenres =
        Object.entries(
            genreFrequency
        )
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(
                0,
                5
            )
            .map(
                ([genre]) =>
                    genre
            );


    /*
     * Content already watched by the user should not
     * appear in recommendations.
     */

    const watchedIds =
        new Set(
            watched.map(
                item =>
                    Number(item.id)
            )
        );


    let recommendations = [];


    /*
     * Find content matching the user's favorite genres.
     */

    favoriteGenres.forEach(
        genre => {

            const matches =
                SB.allContent.filter(
                    item => {

                        if (
                            watchedIds.has(
                                Number(
                                    item.id
                                )
                            )
                        ) {
                            return false;
                        }


                        if (
                            !Array.isArray(
                                item.genres
                            )
                        ) {
                            return false;
                        }


                        return item.genres.some(
                            itemGenre =>
                                String(
                                    itemGenre
                                )
                                    .trim()
                                    .toLowerCase() ===
                                genre
                        );
                    }
                );


            recommendations.push(
                ...matches
            );
        }
    );


    /*
     * If no genre matches exist, fall back to top-rated
     * StreamBox content.
     */

    if (
        recommendations.length === 0
    ) {

        recommendations =
            SB.getTopRated(
                Math.max(
                    limit * 2,
                    10
                )
            );
    }


    /*
     * Remove duplicate titles.
     */

    const unique =
        recommendations.filter(
            (item, index, array) =>
                array.findIndex(
                    candidate =>
                        Number(
                            candidate.id
                        ) ===
                        Number(
                            item.id
                        )
                ) === index
        );


    /*
     * Remove anything already watched from the fallback
     * result as well.
     */

    const unwatched =
        unique.filter(
            item =>
                !watchedIds.has(
                    Number(
                        item.id
                    )
                )
        );


    /*
     * Sort by popularity and rating together.
     * This gives the fallback more useful ordering.
     */

    return unwatched
        .sort(
            (a, b) => {

                const scoreA =
                    (
                        Number(
                            a.popularity || 0
                        ) * 0.65
                    ) +
                    (
                        Number(
                            a.rating || 0
                        ) * 10 * 0.35
                    );


                const scoreB =
                    (
                        Number(
                            b.popularity || 0
                        ) * 0.65
                    ) +
                    (
                        Number(
                            b.rating || 0
                        ) * 10 * 0.35
                    );


                return scoreB - scoreA;
            }
        )
        .slice(
            0,
            limit
        );
}
