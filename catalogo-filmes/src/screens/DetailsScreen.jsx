import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails, getPosterUrl } from '../services/api';

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
    // Só busca na API se a tela foi aberta direto (sem vir da listagem),
    // ex: usuário deu refresh na página ou acessou o link direto.
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
    <div style={{ padding: 16 }}>
      <button type="button" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        style={{ width: 300, borderRadius: 8 }}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Nota: {movie.vote_average}</p>
      <p>Lançamento: {movie.release_date}</p>
    </div>
  );
}
