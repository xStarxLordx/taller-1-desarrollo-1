import { useState } from 'react'
import CharacterList from './components/CharacterList'
import useCharacters  from './hooks/useCharacters'
import styles from './App.module.css'
import SearchBar from './components/SearchBar'

function App() {
  const [query, setQuery] = useState('Rick')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const { characters, loading, error, isEmpty, totalPages } = useCharacters(query, page)

  function renderList() {
    if (loading){
      return <p>Cargando...</p>
    }
    if (error) {
      return <p>Error: {error}</p>
    }
    if (isEmpty) {
      return <p>No hay personajes que coincidan con tu búsqueda.</p>
    }
    return (
      <CharacterList
        characters={characters}
        onSelect={setSelectedId}
      />
    )
  }

  return (
    <div className= {styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            Rick <span className={styles.accent}> & </span> Morty
          </h1>
        </div>
      </header>

      <main className={styles.main}>
        <SearchBar value={query} onChange={setQuery} />
        {renderList()}
      </main>

    </div>
  )
}

export default App
