import { useNavigate } from 'react-router-dom';
import { getPosterUrl } from '../services/api';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Passa o filme já carregado via state da navegação, assim a tela de
    // detalhes pode reaproveitar esses dados sem esperar uma nova chamada à API.
    navigate(`/filme/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        className="movie-poster"
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
      />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
}
