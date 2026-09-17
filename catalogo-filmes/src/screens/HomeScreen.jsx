import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies, searchMovies } from '../services/api';
import './HomeScreen.css';

const SORT_OPTIONS = [
  { value: 'popularidade', label: 'Mais populares' },
  { value: 'nota', label: 'Melhor avaliados' },
  { value: 'titulo', label: 'Título (A-Z)' },
  { value: 'lancamento', label: 'Lançamento (mais recente)' },
];

function sortMovies(movies, sortBy) {
  const sorted = [...movies];
  switch (sortBy) {
    case 'nota':
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case 'titulo':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'lancamento':
      return sorted.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
    default:
      return sorted;
  }
}

export default function HomeScreen() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const committedSearch = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'popularidade';

  const [inputValue, setInputValue] = useState(committedSearch);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMovies = useCallback((term) => {
    setLoading(true);
    setError(false);
    const request = term ? searchMovies(term) : getPopularMovies();
    request
      .then((res) => setMovies(res.data.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (inputValue) next.set('q', inputValue);
          else next.delete('q');
          return next;
        },
        { replace: true },
      );
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchParams]);

 
  useEffect(() => {
    loadMovies(committedSearch);
  }, [committedSearch, loadMovies]);

  const handleSortChange = (e) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('sort', e.target.value);
        return next;
      },
      { replace: true },
    );
  };

  const displayedMovies = sortMovies(movies, sortBy);

  return (
    <div>
      <h1>CineLista</h1>

      <div className="home-controls">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar filme pelo título..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <select className="sort-select" value={sortBy} onChange={handleSortChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loading />}

      {!loading && error && (
        <ErrorMessage
          message="Não foi possível carregar os filmes. Verifique sua conexão."
          onRetry={() => loadMovies(committedSearch)}
        />
      )}

      {!loading && !error && displayedMovies.length === 0 && (
        <p className="empty-state">
          {committedSearch
            ? `Nenhum filme encontrado para "${committedSearch}".`
            : 'Nenhum filme disponível no momento.'}
        </p>
      )}

      {!loading && !error && displayedMovies.length > 0 && (
        <div className="movie-grid">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}