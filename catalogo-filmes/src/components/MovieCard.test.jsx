import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import MovieCard from './MovieCard';

const mockMovie = {
  id: 42,
  title: 'Filme de Teste',
  poster_path: '/poster-teste.jpg',
};

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('MovieCard', () => {
  it('exibe o título do filme', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Filme de Teste')).toBeInTheDocument();
  });

  it('exibe o pôster com a URL e o alt corretos', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    const image = screen.getByAltText('Filme de Teste');
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/poster-teste.jpg',
    );
  });
});
