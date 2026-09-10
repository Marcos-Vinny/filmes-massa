import { useCallback, useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/api';

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMovies = useCallback(() => {
    setLoading(true);
    setError(false);
    getPopularMovies()
      .then((res) => setMovies(res.data.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorMessage
        message="Não foi possível carregar os filmes. Verifique sua conexão."
        onRetry={loadMovies}
      />
    );
  }

  return (
    <div>
      <h1>Catálogo de Filmes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
