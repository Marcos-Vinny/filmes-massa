export default function ErrorMessage({ message = 'Não foi possível carregar os dados.', onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 16px' }}>
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
