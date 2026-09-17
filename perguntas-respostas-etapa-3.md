# Catálogo de Filmes — Etapa 3: Identidade, Feature Pós-MVP e Entrega Final

## 1. Identidade visual

**1. Qual paleta de cores e fonte de destaque o grupo escolheu? Por que essas escolhas combinam com a proposta do app?**
A paleta é escura (fundo `#0b0c10`, cards em `#16181d`), com dourado (`#e6b325`) como cor de destaque para botões, hover e bordas em foco. Para tipografia, usamos `Bebas Neue` nos títulos (H1/H2) e `Inter` no corpo do texto. A combinação fundo escuro + dourado remete à estética de cinema/sala escura e tapete vermelho, e o `Bebas Neue` (fonte condensada, em caixa alta por natureza) lembra cartazes e letreiros de filme, reforçando a identidade do app sem comprometer a legibilidade, que fica a cargo da `Inter` no restante do texto.

**2. O que foi feito para manter consistência visual entre a tela de listagem e a tela de detalhes (espaçamento, botões, componentes)?**
Todas as cores, raio de borda e fontes foram centralizados em variáveis CSS (`--color-bg`, `--color-primary`, `--radius`, `--font-heading`, `--font-body` etc.) declaradas uma única vez em `index.css`. Tanto o `MovieCard` (na Home) quanto os elementos da `DetailsScreen` (botão voltar, cards de informação) consomem essas mesmas variáveis, em vez de valores fixos espalhados pelo código. Isso garante que, se qualquer cor ou fonte precisar mudar no futuro, basta alterar em um único lugar e a mudança se propaga para o app inteiro.

**3. O ícone e a splash screen do app já refletem essa identidade, ou ainda estão no padrão do template?**
O ícone (favicon) foi trocado do padrão do Vite para um emoji de claquete de cinema (🎬), coerente com o tema do app. Como o projeto é uma aplicação web (não um app mobile via Expo), não existe uma splash screen nativa — o equivalente aqui é a própria tela de carregamento inicial (`Loading`), que já usa as cores da identidade (`var(--color-text-muted)`) em vez do estilo padrão do template.

## 2. Feature pós-MVP

**4. Qual(is) categoria(s) do cardápio pós-MVP o grupo escolheu implementar? Por que essa escolha faz sentido para o tipo de app que estão construindo?**
Escolhemos **Descoberta** (busca por título + ordenação da lista). Faz sentido porque o app é, por natureza, um catálogo de navegação — o problema mais direto que um usuário tem é "como eu acho o filme que eu quero" e "como eu organizo os resultados", e isso não depende de nenhuma infraestrutura nova (login, backend de negócio, pagamento) que o MVP não tinha.

**5. O que foi necessário instalar ou configurar para implementar essa funcionalidade (bibliotecas, serviços externos, permissões)?**
Nenhuma biblioteca nova. Usamos o endpoint `/search/movie`, que já é da mesma API TMDB usada no MVP (mesma `API_KEY`, mesma configuração de `.env`). A única adição de código foi a função `searchMovies` em `services/api.js`. Também reaproveitamos o `react-icons`, que já estava instalado desde o MVP mas nunca tinha sido usado — agora ele fornece o ícone de lupa no campo de busca.

**6. Existe alguma categoria do cardápio que o grupo considerou e descartou? Por quê?**
Sim, todas as outras foram consideradas e descartadas:
- **Login e cadastro:** exigiria um backend de autenticação e lidar com dados sensíveis de usuário, o que está fora do escopo desta etapa.
- **Notificações:** dependeria de um gatilho de negócio (ex: "filme favorito saiu" ou "novo lançamento") que o app ainda não tem, já que não existe conceito de favoritos ou preferências salvas.
- **Preço/monetização:** o app é um catálogo informativo, sem produto real a ser vendido — exibir um "preço" ou "plano premium" seria puramente decorativo, sem função real na proposta do app.
- **Personalização (favoritos, avaliações, histórico):** depende de login/autenticação para persistir esses dados por usuário, que descartamos pelo motivo acima.

**7. Como a nova funcionalidade se conecta às telas já existentes (listagem e detalhes)?**
A busca e a ordenação atuam diretamente sobre a `HomeScreen`: o campo de busca substitui a chamada de "filmes populares" por uma chamada de busca por título (com debounce de 400ms), e o seletor de ordenação reordena a lista já carregada (por nota, título ou data de lançamento) antes de renderizar os `MovieCard`. Como o clique em qualquer card continua levando para `/filme/:id` da mesma forma, a `DetailsScreen` não precisou de nenhuma alteração de fluxo — só recebe filmes vindos de uma lista filtrada/ordenada em vez da lista padrão.

**8. A funcionalidade implementada é real (ex: login funcional) ou uma simulação de interface (ex: preço mockado)? Justifiquem a escolha.**
É real. A busca faz uma chamada de verdade ao endpoint `/search/movie` da API TMDB, retornando resultados reais e atualizados — não é uma lista mockada nem filtrada apenas em memória sobre dados estáticos. A ordenação é feita no cliente sobre os resultados reais retornados pela API. Escolhemos implementação real porque a categoria "Descoberta" não tinha nenhum bloqueio técnico (diferente de login ou pagamento) que justificasse mockar.

## 3. Refinamento de UX e qualidade

**9. Quais estados vazios (ex: busca sem resultado) foram tratados? O que o usuário vê nesses casos?**
Tratamos o estado de busca sem resultados: quando `searchTerm` não é vazio e a API retorna uma lista vazia, o usuário vê a mensagem `Nenhum filme encontrado para "<termo buscado>"` em vez de uma tela em branco. Também existe uma mensagem separada para quando não há filmes disponíveis mesmo sem busca ativa (`Nenhum filme disponível no momento`), cobrindo o caso de a API retornar uma lista vazia por outro motivo.

**10. O que mudou na experiência de uso depois da revisão cruzada com outro grupo? Algum ponto de confusão foi identificado?**
> O maior problema encontrado foi o fato dele voltar pra tela inicial sempre que sair de outra tela, ex: ricardo pesquisou "vingadores" e abriu a aba de vingadores guerra infinita mas quando ele clicou em voltar n tava na tela de pesquisa de vingadores e sim na tela inicial e isso incomodou um pouco eles então eu mudei isso

**11. O que foi removido ou reorganizado na limpeza do código (código morto, imports não usados, nomenclatura)?**
O `react-icons`, que estava no `package.json` desde o MVP sem nenhum uso real no código, agora é efetivamente usado (ícone de busca), então deixou de ser uma dependência morta. Os estilos que antes ficavam como `style={{ ... }}` inline direto no JSX de `HomeScreen` e `DetailsScreen` foram extraídos para arquivos `.css` próprios de cada tela (`HomeScreen.css`, `DetailsScreen.css`), padronizando a forma como o projeto organiza estilos (mesmo padrão que `MovieCard.css` já usava desde o MVP).

**12. Os testes automatizados escritos na etapa do MVP ainda passam depois das mudanças desta etapa? Se algum quebrou, o que foi ajustado?**
Sim, os dois testes (`api.test.js` e `MovieCard.test.jsx`) continuam passando sem nenhum ajuste, porque as mudanças desta etapa não alteraram a lógica de `getPosterUrl` nem o comportamento do `MovieCard` — só adicionaram busca/ordenação na `HomeScreen` e estilos novos, que não são o que esses testes cobrem.

**13. O README atual documenta o que o app faz, como rodar o projeto e as principais decisões tomadas? O que foi adicionado nesta etapa?**
Sim. Nesta etapa foram adicionadas ao README as seções sobre a identidade visual (paleta e fonte escolhidas), a funcionalidade de Descoberta implementada (busca + ordenação, e por que essa categoria foi escolhida em vez das demais) e a atualização do comando de build de teste (`npm run build` + `npm run preview`, já que o projeto é web e não usa Expo).

**14. O grupo conseguiu gerar um build de teste (ex: build de preview via Expo)? Se não, qual foi o obstáculo?**
> rodou de primeira

**15. Olhando o app finalizado, o que ele tem hoje que o MVP original não tinha — e o que ainda ficaria para uma futura versão?**
Hoje o app tem: identidade visual própria (cores, fonte, ícone), busca por título com debounce, ordenação por nota/título/data, tratamento de estado vazio de busca e feedback visual (hover nos cards e no botão voltar, foco no campo de busca). O que ficaria para uma versão futura: paginação/scroll infinito na listagem (hoje só a primeira página de resultados é exibida, tanto na lista de populares quanto na busca), e uma eventual camada de favoritos, que exigiria implementar login antes.