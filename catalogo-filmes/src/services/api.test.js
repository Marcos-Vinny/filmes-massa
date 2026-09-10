import { describe, expect, it } from 'vitest';
import { getPosterUrl } from './api';

describe('getPosterUrl', () => {
  it('monta a URL completa do pôster a partir do path retornado pela API', () => {
    const url = getPosterUrl('/abc123.jpg');
    expect(url).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
  });

  it('retorna null quando o filme não tem poster_path', () => {
    expect(getPosterUrl(null)).toBeNull();
    expect(getPosterUrl(undefined)).toBeNull();
  });
});
