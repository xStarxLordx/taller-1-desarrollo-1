import { useState } from "react";
import CharacterList from "./components/CharacterList";
import useCharacters from "./hooks/useCharacters";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar";
import useDebouncedValue from "./hooks/useDebouncedVaule";
import CharacterDetails from "./components/CharacterDetails";
import useFavorites from "./hooks/useFavorites";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(
    query,
    import.meta.env.SEARCH_DEBOUNCE,
  );
  const { characters, loading, error, isEmpty, totalPages } = useCharacters(
    debouncedQuery,
    page,
  );

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  function renderList() {
    if (loading) {
      return <p>Cargando...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    if (isEmpty) {
      return <p>No hay personajes que coincidan con tu búsqueda.</p>;
    }
    return <CharacterList characters={characters} onSelect={setSelectedId} favorites={favorites} onToggleFavorite={toggleFavorite} />;
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            Rick <span className={styles.accent}> & </span> Morty
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        {selectedId === null ? (
          <>
            <SearchBar value={query} onChange={setQuery} />
            {renderList()}
          </>
        ) : (
          <CharacterDetails
            id={selectedId}
            onBack={() => setSelectedId(null)}
            isFavorite={isFavorite(selectedId)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;
