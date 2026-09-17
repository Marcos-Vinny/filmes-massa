export default function ErrorMessage({ message = 'Não foi possível carregar os dados.', onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 16px' }}>
      <p style={{ color: 'var(--color-text-muted)' }}>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            marginTop: 8,
            padding: '8px 20px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--color-primary)',
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            cursor: 'pointer',
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}