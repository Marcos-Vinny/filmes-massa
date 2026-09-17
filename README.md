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

## Etapa 3 — identidade visual, feature pós-MVP e entrega final

### Identidade visual

- **Paleta de cores**: fundo escuro (`#0b0c10`), cards em `#16181d` e dourado (`#e6b325`) como cor de destaque em botões, hover e foco — referência à estética de cinema/tapete vermelho.
- **Tipografia**: `Bebas Neue` nos títulos (H1/H2), `Inter` no corpo do texto.
- **Ícone**: favicon trocado do padrão do Vite para um emoji de claquete de cinema (🎬).
- Todas as cores, raio de borda e fontes ficam centralizadas em variáveis CSS (`--color-bg`, `--color-primary`, `--radius`, `--font-heading`, `--font-body`, etc.) declaradas em `src/index.css` e reutilizadas tanto na `HomeScreen` quanto na `DetailsScreen`, garantindo consistência visual entre as telas.

### Feature pós-MVP: Descoberta (busca + ordenação)

Entre as categorias do cardápio pós-MVP (login/cadastro, notificações, preço/monetização, personalização, descoberta), o grupo escolheu **Descoberta**, por não depender de backend novo nem de autenticação — usa o mesmo TMDB já configurado no MVP.

- **Busca por título**: campo de busca na `HomeScreen`, com debounce de 400ms, chamando o endpoint `/search/movie` da API TMDB (função `searchMovies` em `services/api.js`).
- **Ordenação**: seletor com 4 opções (mais populares, melhor avaliados, título A-Z, lançamento mais recente), aplicada sobre a lista já carregada.
- **Busca e ordenação persistem na URL** (`?q=...&sort=...`, via `useSearchParams`), então voltar da tela de detalhes preserva o filtro que estava ativo, em vez de resetar para a lista padrão.
- Demais categorias foram descartadas: login/cadastro (exigiria backend de auth), notificações (não há gatilho de negócio ainda), preço/monetização (o app não vende nada, seria decorativo) e personalização (depende de login).

### Estados vazios e feedback visual

- Mensagem de busca sem resultado: `Nenhum filme encontrado para "<termo>"`.
- Mensagem para lista vazia sem busca ativa: `Nenhum filme disponível no momento`.
- Feedback visual: hover nos cards (elevação + fundo), hover no botão "Voltar", borda destacada no campo de busca em foco.

### Limpeza de código

- `react-icons` (instalado desde o MVP, mas sem uso real) passou a ser usado no ícone de busca.
- Estilos inline foram extraídos para arquivos `.css` próprios de cada tela (`HomeScreen.css`, `DetailsScreen.css`), no mesmo padrão que `MovieCard.css` já seguia.

### Testes

Os testes da Etapa 2 (`api.test.js` e `MovieCard.test.jsx`) continuam passando sem alteração — as mudanças desta etapa não tocaram em `getPosterUrl` nem no comportamento do `MovieCard`.

### Build de teste

Como o projeto é web (Vite), o build de teste é gerado com:
