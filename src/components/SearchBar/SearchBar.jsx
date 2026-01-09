import { useEffect, useRef, useState } from "react";
import {
  search_box_container,
  search_input,
  search_result_container,
  search_result_details,
  cuisine_text,
  dish_name,
  recipe_image,
  search_result_outer_container,
} from "./SearchBar.module.css";

const SearchResult = ({ data }) => {
  const { name, image, cuisine } = data;
  return (
    <div className={search_result_container}>
      <div className={recipe_image}>
        <img src={image} alt="recipe image" loading="lazy" />
      </div>
      <div className={search_result_details}>
        <span className={dish_name}>{name}</span>
        <span className={cuisine_text}>{cuisine}</span>
      </div>
    </div>
  );
};

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const cacheRef = useRef(new Map());
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchText.trim();
    if (!query) {
      setSearchResult([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const cached = cacheRef.current.get(query);
    if (cached) {
      setSearchResult(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        const recipes = data?.recipes ?? [];
        cacheRef.current.set(query, recipes);
        setSearchResult(recipes);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError("Failed to load results");
        setSearchResult([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchText]);

  return (
    <div className={search_box_container}>
      <input
        type="search"
        className={search_input}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
        placeholder="Type to search for recipes...."
      />
      {showResult && (isLoading || error || searchResult.length > 0) && (
        <div
          className={search_result_outer_container}
          onMouseDown={(e) => e.preventDefault()}
          role="listbox"
          aria-label="Search results"
        >
          {isLoading && <div className={search_result_container}>Loading…</div>}
          {!isLoading && error && (
            <div className={search_result_container}>{error}</div>
          )}
          {!isLoading &&
            !error &&
            searchResult.map((data) => (
              <SearchResult key={data.id} data={data} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
