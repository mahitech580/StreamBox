"""
StreamBox
Python Analytics & Recommendation Engine

Processes StreamBox viewing data and generates:

- analytics.json
- recommendations.json

Run:
    python analytics.py
"""

from __future__ import annotations

import json
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from statistics import mean
from typing import Any


# =========================================================
# PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent

DATA_DIR = PROJECT_DIR / "data"
OUTPUT_DIR = DATA_DIR / "generated"

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)

ANALYTICS_FILE = OUTPUT_DIR / "analytics.json"
RECOMMENDATIONS_FILE = OUTPUT_DIR / "recommendations.json"


# =========================================================
# DEMO CONTENT
# =========================================================

CONTENT = [
    {
        "id": 1,
        "title": "The Last Signal",
        "type": "movie",
        "year": 2026,
        "rating": 8.7,
        "popularity": 98,
        "genres": ["Sci-Fi", "Thriller", "Mystery"],
    },
    {
        "id": 2,
        "title": "Shadow Protocol",
        "type": "movie",
        "year": 2026,
        "rating": 8.4,
        "popularity": 94,
        "genres": ["Action", "Thriller"],
    },
    {
        "id": 3,
        "title": "Midnight City",
        "type": "movie",
        "year": 2025,
        "rating": 8.1,
        "popularity": 91,
        "genres": ["Crime", "Drama", "Thriller"],
    },
    {
        "id": 4,
        "title": "Zero Gravity",
        "type": "movie",
        "year": 2025,
        "rating": 8.6,
        "popularity": 89,
        "genres": ["Sci-Fi", "Adventure"],
    },
    {
        "id": 201,
        "title": "Beyond The Horizon",
        "type": "series",
        "year": 2026,
        "rating": 9.1,
        "popularity": 99,
        "genres": ["Sci-Fi", "Adventure", "Drama"],
    },
    {
        "id": 202,
        "title": "Black Circuit",
        "type": "series",
        "year": 2025,
        "rating": 8.8,
        "popularity": 95,
        "genres": ["Crime", "Tech", "Thriller"],
    },
    {
        "id": 301,
        "title": "Neon Eclipse",
        "type": "anime",
        "year": 2026,
        "rating": 9.0,
        "popularity": 97,
        "genres": ["Anime", "Action", "Cyberpunk"],
    },
    {
        "id": 302,
        "title": "Skybound",
        "type": "anime",
        "year": 2025,
        "rating": 8.8,
        "popularity": 92,
        "genres": ["Anime", "Adventure", "Fantasy"],
    },
    {
        "id": 401,
        "title": "The Deep Blue",
        "type": "documentary",
        "year": 2026,
        "rating": 8.9,
        "popularity": 93,
        "genres": ["Documentary", "Nature", "Science"],
    },
    {
        "id": 402,
        "title": "Inside The Machine",
        "type": "documentary",
        "year": 2025,
        "rating": 8.7,
        "popularity": 91,
        "genres": ["Documentary", "Technology", "Science"],
    },
]


# =========================================================
# DEMO WATCH HISTORY
# =========================================================

WATCH_HISTORY = [
    {
        "content_id": 1,
        "watched_at": "2026-09-15T21:30:00",
        "watch_percent": 100,
        "rating": 9,
    },
    {
        "content_id": 201,
        "watched_at": "2026-09-15T19:20:00",
        "watch_percent": 72,
        "rating": 9,
    },
    {
        "content_id": 301,
        "watched_at": "2026-09-14T22:10:00",
        "watch_percent": 100,
        "rating": 10,
    },
    {
        "content_id": 202,
        "watched_at": "2026-09-14T19:00:00",
        "watch_percent": 84,
        "rating": 9,
    },
    {
        "content_id": 4,
        "watched_at": "2026-09-13T21:00:00",
        "watch_percent": 91,
        "rating": 8,
    },
    {
        "content_id": 402,
        "watched_at": "2026-09-12T20:00:00",
        "watch_percent": 100,
        "rating": 9,
    },
]


# =========================================================
# CONTENT INDEX
# =========================================================

CONTENT_BY_ID = {
    int(item["id"]): item
    for item in CONTENT
}


# =========================================================
# HELPERS
# =========================================================

def safe_mean(values: list[float]) -> float:
    """Return average or zero."""
    return round(mean(values), 2) if values else 0.0


def normalize_genre(genre: str) -> str:
    """Normalize genre for comparison."""
    return str(genre).strip().lower()


def format_genre(genre: str) -> str:
    """Convert genre to display format."""
    return str(genre).title()


def get_content(
    content_id: int,
) -> dict[str, Any] | None:
    """Find content by ID."""
    return CONTENT_BY_ID.get(
        int(content_id)
    )


# =========================================================
# VIEWING ANALYTICS
# =========================================================

def calculate_total_views(
    history: list[dict[str, Any]],
) -> int:

    return len(history)


def calculate_completion_rate(
    history: list[dict[str, Any]],
) -> float:

    if not history:
        return 0.0

    completed = sum(
        1
        for entry in history
        if float(
            entry.get(
                "watch_percent",
                0,
            )
        ) >= 90
    )

    return round(
        completed / len(history) * 100,
        2,
    )


def calculate_average_watch_percent(
    history: list[dict[str, Any]],
) -> float:

    percentages = [
        float(
            entry.get(
                "watch_percent",
                0,
            )
        )
        for entry in history
    ]

    return safe_mean(
        percentages
    )


def calculate_average_user_rating(
    history: list[dict[str, Any]],
) -> float:

    ratings = [
        float(entry["rating"])
        for entry in history
        if entry.get("rating") is not None
    ]

    return safe_mean(
        ratings
    )


def calculate_genre_distribution(
    history: list[dict[str, Any]],
) -> dict[str, int]:

    counter: Counter[str] = Counter()

    for entry in history:

        content = get_content(
            entry["content_id"]
        )

        if not content:
            continue

        for genre in content.get(
            "genres",
            [],
        ):

            counter[
                normalize_genre(genre)
            ] += 1

    return dict(
        counter.most_common()
    )


def calculate_type_distribution(
    history: list[dict[str, Any]],
) -> dict[str, int]:

    counter: Counter[str] = Counter()

    for entry in history:

        content = get_content(
            entry["content_id"]
        )

        if not content:
            continue

        content_type = content.get(
            "type",
            "unknown",
        )

        counter[
            content_type
        ] += 1

    return dict(
        counter.most_common()
    )


def calculate_daily_activity(
    history: list[dict[str, Any]],
) -> dict[str, int]:

    counter: Counter[str] = Counter()

    for entry in history:

        timestamp = entry.get(
            "watched_at",
            "",
        )

        try:

            date = (
                datetime
                .fromisoformat(timestamp)
                .date()
                .isoformat()
            )

        except ValueError:

            date = "unknown"

        counter[date] += 1

    return dict(
        sorted(
            counter.items()
        )
    )


def calculate_rating_distribution(
    history: list[dict[str, Any]],
) -> dict[str, int]:

    counter: Counter[str] = Counter()

    for entry in history:

        rating = float(
            entry.get(
                "rating",
                0,
            )
        )

        if rating >= 10:
            bucket = "10"
        elif rating >= 9:
            bucket = "9"
        elif rating >= 8:
            bucket = "8"
        elif rating >= 7:
            bucket = "7"
        else:
            bucket = "6_or_less"

        counter[bucket] += 1

    return dict(counter)


# =========================================================
# CONTENT ENGAGEMENT
# =========================================================

def calculate_content_engagement(
    history: list[dict[str, Any]],
) -> list[dict[str, Any]]:

    stats: dict[
        int,
        dict[str, Any],
    ] = defaultdict(
        lambda: {
            "views": 0,
            "watch_percentages": [],
            "ratings": [],
        }
    )

    for entry in history:

        content_id = int(
            entry["content_id"]
        )

        stats[content_id][
            "views"
        ] += 1

        stats[content_id][
            "watch_percentages"
        ].append(
            float(
                entry.get(
                    "watch_percent",
                    0,
                )
            )
        )

        if entry.get(
            "rating"
        ) is not None:

            stats[content_id][
                "ratings"
            ].append(
                float(
                    entry["rating"]
                )
            )

    result = []

    for content_id, values in stats.items():

        content = get_content(
            content_id
        )

        if not content:
            continue

        average_watch = safe_mean(
            values["watch_percentages"]
        )

        average_rating = safe_mean(
            values["ratings"]
        )

        engagement_score = round(
            (
                average_watch * 0.50
                + content["rating"] * 10 * 0.25
                + content["popularity"] * 0.25
            ),
            2,
        )

        result.append(
            {
                "content_id": content_id,
                "title": content["title"],
                "views": values["views"],
                "average_watch_percent": average_watch,
                "average_rating": average_rating,
                "engagement_score": engagement_score,
            }
        )

    return sorted(
        result,
        key=lambda item: item[
            "engagement_score"
        ],
        reverse=True,
    )


# =========================================================
# USER PROFILE
# =========================================================

def build_user_profile(
    history: list[dict[str, Any]],
) -> dict[str, Any]:

    genre_distribution = (
        calculate_genre_distribution(
            history
        )
    )

    type_distribution = (
        calculate_type_distribution(
            history
        )
    )

    favorite_genres = [
        format_genre(genre)
        for genre, _ in list(
            genre_distribution.items()
        )[:5]
    ]

    favorite_type = (
        next(
            iter(
                type_distribution
            )
        )
        if type_distribution
        else "unknown"
    )

    return {
        "favorite_genres": favorite_genres,
        "favorite_content_type": favorite_type,
        "genre_distribution": genre_distribution,
        "type_distribution": type_distribution,
    }


# =========================================================
# RECOMMENDATION SCORING
# =========================================================

def calculate_recommendation_score(
    content: dict[str, Any],
    profile: dict[str, Any],
    watched_ids: set[int],
) -> float:

    if int(content["id"]) in watched_ids:
        return -1.0

    favorite_genres = {
        normalize_genre(genre)
        for genre in profile.get(
            "favorite_genres",
            [],
        )
    }

    matching_genres = sum(
        1
        for genre in content.get(
            "genres",
            [],
        )
        if normalize_genre(genre)
        in favorite_genres
    )

    genre_score = min(
        matching_genres * 20,
        40,
    )

    rating_score = (
        float(
            content.get(
                "rating",
                0,
            )
        ) * 4
    )

    popularity_score = (
        float(
            content.get(
                "popularity",
                0,
            )
        ) * 0.2
    )

    recency_score = (
        5
        if int(
            content.get(
                "year",
                0,
            )
        ) >= 2026
        else 0
    )

    total_score = (
        genre_score
        + rating_score
        + popularity_score
        + recency_score
    )

    return round(
        total_score,
        2,
    )


def build_recommendation_reason(
    content: dict[str, Any],
    profile: dict[str, Any],
) -> str:

    favorite_genres = {
        normalize_genre(genre)
        for genre in profile.get(
            "favorite_genres",
            [],
        )
    }

    matches = [
        genre
        for genre in content.get(
            "genres",
            [],
        )
        if normalize_genre(genre)
        in favorite_genres
    ]

    if matches:

        return (
            "Because you enjoy "
            + ", ".join(matches)
        )

    if content.get(
        "rating",
        0,
    ) >= 9:

        return "Highly rated content"

    return "Popular on StreamBox"


def generate_recommendations(
    content: list[dict[str, Any]],
    history: list[dict[str, Any]],
    limit: int = 10,
) -> list[dict[str, Any]]:

    profile = build_user_profile(
        history
    )

    watched_ids = {
        int(
            item["content_id"]
        )
        for item in history
    }

    scored = []

    for item in content:

        score = (
            calculate_recommendation_score(
                item,
                profile,
                watched_ids,
            )
        )

        if score <= 0:
            continue

        scored.append(
            {
                "content_id": int(
                    item["id"]
                ),
                "title": item["title"],
                "type": item["type"],
                "rating": item["rating"],
                "genres": item["genres"],
                "recommendation_score": score,
                "reason":
                    build_recommendation_reason(
                        item,
                        profile,
                    ),
            }
        )

    scored.sort(
        key=lambda item: item[
            "recommendation_score"
        ],
        reverse=True,
    )

    return scored[:limit]


# =========================================================
# DASHBOARD SUMMARY
# =========================================================

def build_dashboard_summary(
    history: list[dict[str, Any]],
) -> dict[str, Any]:

    return {
        "total_views":
            calculate_total_views(history),

        "completion_rate":
            calculate_completion_rate(history),

        "average_watch_percent":
            calculate_average_watch_percent(
                history
            ),

        "average_user_rating":
            calculate_average_user_rating(
                history
            ),

        "favorite_genres":
            list(
                calculate_genre_distribution(
                    history
                ).items()
            )[:5],

        "content_types":
            calculate_type_distribution(
                history
            ),

        "daily_activity":
            calculate_daily_activity(
                history
            ),

        "rating_distribution":
            calculate_rating_distribution(
                history
            ),
    }


# =========================================================
# OUTPUT GENERATION
# =========================================================

def generate_output() -> None:

    summary = build_dashboard_summary(
        WATCH_HISTORY
    )

    profile = build_user_profile(
        WATCH_HISTORY
    )

    engagement = calculate_content_engagement(
        WATCH_HISTORY
    )

    recommendations = generate_recommendations(
        CONTENT,
        WATCH_HISTORY,
        limit=10,
    )

    generated_at = datetime.now().isoformat()

    analytics_payload = {
        "project": "StreamBox",
        "generated_at": generated_at,
        "summary": summary,
        "user_profile": profile,
        "content_engagement": engagement,
    }

    recommendation_payload = {
        "project": "StreamBox",
        "generated_at": generated_at,
        "profile": profile,
        "recommendations": recommendations,
    }

    with ANALYTICS_FILE.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            analytics_payload,
            file,
            indent=4,
            ensure_ascii=False,
        )

    with RECOMMENDATIONS_FILE.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            recommendation_payload,
            file,
            indent=4,
            ensure_ascii=False,
        )

    print(
        "StreamBox analytics generated successfully."
    )

    print(
        f"Analytics: {ANALYTICS_FILE}"
    )

    print(
        f"Recommendations: {RECOMMENDATIONS_FILE}"
    )

    print(
        f"Recommendations generated: {len(recommendations)}"
    )


# =========================================================
# CLI
# =========================================================

if __name__ == "__main__":
    generate_output()
