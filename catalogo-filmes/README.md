# Catálogo de Filmes

Aplicação web desenvolvida em React (Vite) que exibe uma lista de filmes com pôster e título, permitindo clicar em um item para ver seus detalhes completos.

## Integrantes do grupo

- Daniel dos Santos Souza
- Davi Santos
- Marcos Vinícius Farias Silva
- Ricardo Lemos
- João Luiz Correia

## Bibliotecas utilizadas

| Necessidade            | Biblioteca         | Instalação                     |
|-------------------------|---------------------|----------------------------------|
| Navegação entre telas   | `react-router-dom`  | `npm install react-router-dom`  |
| Consumo de API          | `axios`             | `npm install axios`             |
| Ícones                  | `react-icons`       | `npm install react-icons`       |

## Arquitetura do projeto

```
catalogo-filmes/
├── src/
│   ├── assets/          # imagens e arquivos estáticos
│   ├── components/      # componentes reutilizáveis (MovieCard, Loading)
│   ├── screens/         # telas do app (HomeScreen, DetailsScreen)
│   ├── services/        # lógica de comunicação com a API (api.js)
│   ├── App.jsx           # configuração das rotas
│   ├── main.jsx           # ponto de entrada da aplicação
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

### Telas

- **HomeScreen**: lista os filmes populares (pôster + título), buscando os dados via `services/api.js`.
- **DetailsScreen**: acessada pela rota `/filme/:id`, busca os detalhes completos do filme (sinopse, nota, data de lançamento) na API a partir do id vindo da URL.

### Fluxo de dados

`HomeScreen` busca a lista de filmes na API e renderiza os cards. Ao clicar em um filme, a rota muda para `/filme/:id` (via `useNavigate`), e `DetailsScreen` lê esse `id` com `useParams` para fazer uma nova chamada à API e obter as informações completas daquele filme.

## Como rodar o projeto

```
npm install
cp .env.example .env   # depois edite o .env e coloque sua chave do TMDB
npm run dev
```

## Testes

```
npm run test
```

## MVP (Etapa 2 — telas, navegação, estados e testes)

Nesta etapa, o projeto evoluiu de "setup" para um MVP navegável:

- **HomeScreen**: busca os filmes populares via `services/api.js` e renderiza a lista com o componente `MovieCard`. Trata três estados: carregando (`Loading`), erro (`ErrorMessage`, com botão "Tentar novamente") e sucesso.
- **MovieCard**: componente reutilizável — recebe um `movie` por prop e, ao ser clicado, navega para `/filme/:id` já enviando o objeto do filme pelo `state` da navegação (`navigate(path, { state: { movie } })`), evitando uma segunda chamada à API.
- **DetailsScreen**: se o filme já veio pelo `state` da navegação, usa esses dados direto. Se a tela for aberta sem esse `state` (ex: acesso direto pela URL ou refresh da página), busca os dados na API. Também trata loading e erro/retry, e tem um botão "Voltar" que usa `navigate(-1)` (preserva a posição de scroll da listagem, por usar o histórico do navegador em vez de recarregar a Home).
- **ErrorMessage**: componente reutilizável de erro, usado tanto na Home quanto nos Detalhes, com callback opcional de retry.
- **services/api.js**: além das chamadas à API, agora tem `getPosterUrl(posterPath)`, uma função pura que monta a URL da imagem — isolada justamente para poder ser testada sem precisar de rede.
- **Testes automatizados** (Vitest + React Testing Library):
  - `src/services/api.test.js`: testa `getPosterUrl` (monta URL corretamente e retorna `null` quando não há poster).
  - `src/components/MovieCard.test.jsx`: testa se o `MovieCard` renderiza o título e a imagem com o `src`/`alt` corretos, usando um filme mockado.
- A chave da API saiu do código-fonte e passou a vir de variável de ambiente (`VITE_TMDB_API_KEY`, em `.env`, que está no `.gitignore`).
