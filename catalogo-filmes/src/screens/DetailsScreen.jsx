import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails, getPosterUrl } from '../services/api';
import './DetailsScreen.css';

export default function DetailsScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Se veio da HomeScreen, o filme já chega pronto pelo state da navegação.
  const movieFromList = location.state?.movie ?? null;

  const [movie, setMovie] = useState(movieFromList);
  const [loading, setLoading] = useState(!movieFromList);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(() => {
    setLoading(true);
    setError(false);
    getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    
    if (!movieFromList) {
      fetchMovie();
    }
  }, [movieFromList, fetchMovie]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorMessage
        message="Não foi possível carregar os detalhes do filme."
        onRetry={fetchMovie}
      />
    );
  }
  if (!movie) return null;

  return (
    <div className="details-screen">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      <div className="details-content">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="details-poster"
        />
        <div className="details-info">
          <h2>{movie.title}</h2>
          <p className="details-overview">
            {movie.overview || 'Sinopse não disponível para este filme.'}
          </p>
          <p>
  <strong>Nota TMDB:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
  {movie.vote_count ? ` (${movie.vote_count} votos)` : ''}
</p>
          <p><strong>Lançamento:</strong> {movie.release_date || 'Data não informada'}</p>
        </div>
      </div>
    </div>
  );
}