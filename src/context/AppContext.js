import React, { createContext, useContext, useEffect, useReducer } from "react";
import { fetchSearchResults, fetchTopAnime } from "../api/animeApi";

const AppContext = createContext();

const initialState = {
  search: "Trending",
  searchResults: [],
  topAnime: [],
  loadingSearch: true,
  loadingTopAnime: true,
  searchError: "",
  topAnimeError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        searchError: "",
      };
    case "FETCH_SEARCH_START":
      return {
        ...state,
        loadingSearch: true,
        searchError: "",
      };
    case "FETCH_SEARCH_SUCCESS":
      return {
        ...state,
        loadingSearch: false,
        searchResults: action.payload,
      };
    case "FETCH_SEARCH_ERROR":
      return {
        ...state,
        loadingSearch: false,
        searchError: action.payload,
        searchResults: [],
      };
    case "FETCH_TOP_ANIME_START":
      return {
        ...state,
        loadingTopAnime: true,
        topAnimeError: "",
      };
    case "FETCH_TOP_ANIME_SUCCESS":
      return {
        ...state,
        loadingTopAnime: false,
        topAnime: action.payload,
      };
    case "FETCH_TOP_ANIME_ERROR":
      return {
        ...state,
        loadingTopAnime: false,
        topAnimeError: action.payload,
        topAnime: [],
      };
    default:
      return state;
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const SearchAnime = (value) => {
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };

  const loadSearchResults = async (query) => {
    dispatch({ type: "FETCH_SEARCH_START" });

    try {
      const results = await fetchSearchResults(query);
      dispatch({
        type: "FETCH_SEARCH_SUCCESS",
        payload: results,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_SEARCH_ERROR",
        payload: error.message || "Something went wrong while searching.",
      });
    }
  };

  const loadTopAnime = async () => {
    dispatch({ type: "FETCH_TOP_ANIME_START" });

    try {
      const results = await fetchTopAnime();
      dispatch({
        type: "FETCH_TOP_ANIME_SUCCESS",
        payload: results,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_TOP_ANIME_ERROR",
        payload: error.message || "Unable to load anime right now.",
      });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const query = state.search.trim();
    if (!query) {
      dispatch({
        type: "FETCH_SEARCH_ERROR",
        payload: "Please enter an anime title to search.",
      });
      return;
    }

    await loadSearchResults(query);
  };

  useEffect(() => {
    loadSearchResults(initialState.search);
    loadTopAnime();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        SearchAnime,
        submitHandler,
        reloadSearchResults: () => loadSearchResults(state.search.trim() || initialState.search),
        reloadTopAnime: loadTopAnime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };
