import React, { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react'

const AppContext = createContext();

const API = "https://graphql.anilist.co";

export const GENRES = [
    { id: 1, name: "ACTION", filter: { genre: "Action" }, explore: "genres=Action" },
    { id: 2, name: "SHOUNEN", filter: { tag: "Shounen" }, explore: "tags=Shounen" },
    { id: 3, name: "COMEDY", filter: { genre: "Comedy" }, explore: "genres=Comedy" },
    { id: 4, name: "FANTASY", filter: { genre: "Fantasy" }, explore: "genres=Fantasy" },
    { id: 5, name: "ROMANCE", filter: { genre: "Romance" }, explore: "genres=Romance" },
    { id: 6, name: "SPORTS", filter: { genre: "Sports" }, explore: "genres=Sports" },
];

const QUERY = `query ($perPage: Int, $sort: [MediaSort], $search: String, $genre: String, $tag: String) {
  Page(perPage: $perPage) {
    media(type: ANIME, isAdult: false, sort: $sort, search: $search, genre: $genre, tag: $tag) {
      id
      siteUrl
      title { english romaji }
      coverImage { large extraLarge }
      bannerImage
      trailer { id site }
      format
      averageScore
      episodes
      status
      description(asHtml: false)
      genres
    }
  }
}`;

const STATUS = {
    FINISHED: "Finished",
    RELEASING: "Airing",
    NOT_YET_RELEASED: "Upcoming",
    CANCELLED: "Cancelled",
    HIATUS: "On hiatus",
};

const cleanText = (text) => (text || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const emptyList = { items: [], loading: true, error: null };

const initialState = {
    search: "",
    searchTerm: "",
    trending: emptyList,
    popular: emptyList,
    results: { items: [], loading: false, error: null },
    genres: {},
};

const toAnime = (a) => ({
    id: a.id,
    title: a.title?.english || a.title?.romaji,
    image: a.bannerImage || a.coverImage?.extraLarge || a.coverImage?.large,
    poster: a.coverImage?.large,
    url: a.siteUrl,
    trailer: a.trailer?.site === "youtube" ? `https://www.youtube.com/watch?v=${a.trailer.id}` : null,
    type: a.format ? a.format.replace(/_/g, " ") : "",
    score: a.averageScore ? (a.averageScore / 10).toFixed(1) : null,
    episodes: a.episodes,
    status: STATUS[a.status] || a.status,
    synopsis: cleanText(a.description),
    genres: a.genres || [],
});

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SEARCH_START":
            return { ...state, searchTerm: action.payload, results: { items: [], loading: true, error: null } };
        case "SEARCH_CLEAR":
            return { ...state, search: "", searchTerm: "", results: { items: [], loading: false, error: null } };
        case "LIST_START":
            return { ...state, [action.key]: { ...state[action.key], loading: true, error: null } };
        case "LIST_DONE":
            return { ...state, [action.key]: { items: action.payload, loading: false, error: null } };
        case "LIST_ERROR":
            return { ...state, [action.key]: { items: [], loading: false, error: action.payload } };
        case "GENRE_START":
            return { ...state, genres: { ...state.genres, [action.id]: { items: [], loading: true, error: null } } };
        case "GENRE_DONE":
            return { ...state, genres: { ...state.genres, [action.id]: { items: action.payload, loading: false, error: null } } };
        case "GENRE_ERROR":
            return { ...state, genres: { ...state.genres, [action.id]: { items: [], loading: false, error: action.payload } } };
        default:
            return state;
    }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const queue = useRef(Promise.resolve());

    const fetchList = useCallback((variables) => {
        const run = queue.current.then(async () => {
            for (let attempt = 0; attempt < 3; attempt++) {
                const res = await fetch(API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({ query: QUERY, variables }),
                });
                if (res.status === 429) {
                    await sleep(1200);
                    continue;
                }
                if (!res.ok) throw new Error(`Request failed (${res.status})`);
                const json = await res.json();
                return (json.data?.Page?.media || []).map(toAnime);
            }
            throw new Error("Too many requests, please try again");
        });
        queue.current = run.catch(() => {}).then(() => sleep(250));
        return run;
    }, []);

    const loadList = useCallback(
        async (key, variables) => {
            dispatch({ type: "LIST_START", key });
            try {
                dispatch({ type: "LIST_DONE", key, payload: await fetchList(variables) });
            } catch (e) {
                dispatch({ type: "LIST_ERROR", key, payload: e.message });
            }
        },
        [fetchList]
    );

    const loadGenre = useCallback(
        async (id) => {
            dispatch({ type: "GENRE_START", id });
            try {
                const genre = GENRES.find((g) => g.id === id);
                dispatch({ type: "GENRE_DONE", id, payload: await fetchList({ perPage: 5, sort: ["POPULARITY_DESC"], ...genre.filter }) });
            } catch (e) {
                dispatch({ type: "GENRE_ERROR", id, payload: e.message });
            }
        },
        [fetchList]
    );

    const loadTrending = useCallback(() => loadList("trending", { perPage: 20, sort: ["TRENDING_DESC"] }), [loadList]);
    const loadPopular = useCallback(() => loadList("popular", { perPage: 20, sort: ["POPULARITY_DESC"] }), [loadList]);

    useEffect(() => {
        loadTrending();
        loadPopular();
        GENRES.slice(0, 3).forEach((g) => loadGenre(g.id));
    }, [loadTrending, loadPopular, loadGenre]);

    const SearchAnime = (value) => {
        dispatch({ type: "SET_SEARCH", payload: value });
        if (!value.trim()) dispatch({ type: "SEARCH_CLEAR" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const q = state.search.trim();
        if (!q) return;
        dispatch({ type: "SEARCH_START", payload: q });
        try {
            const items = await fetchList({ perPage: 20, search: q, sort: ["SEARCH_MATCH", "POPULARITY_DESC"] });
            dispatch({ type: "LIST_DONE", key: "results", payload: items });
        } catch (err) {
            dispatch({ type: "LIST_ERROR", key: "results", payload: err.message });
        }
    };

    const clearSearch = () => dispatch({ type: "SEARCH_CLEAR" });

    return (
        <AppContext.Provider
            value={{ ...state, submitHandler, SearchAnime, clearSearch, loadTrending, loadPopular, loadGenre }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };
