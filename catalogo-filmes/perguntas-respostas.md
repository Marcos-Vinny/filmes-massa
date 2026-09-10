# Catálogo de Filmes — Perguntas e Respostas da Aula

## 1. Pesquisa de bibliotecas

**1. Quais bibliotecas o grupo escolheu para cada uma dessas três necessidades?**
Navegação: `react-router-dom`. Consumo de API: `axios`. Ícones: `react-icons`.

**2. Por que escolheram cada uma delas, em vez de outras opções encontradas na pesquisa?**
O React Router é a biblioteca padrão de roteamento para aplicações React web, com documentação oficial completa e ampla adoção pela comunidade. O Axios foi escolhido em vez do `fetch` nativo por oferecer sintaxe mais simples, interceptadores de requisição/resposta e configuração centralizada de baseURL e parâmetros. O `react-icons` foi escolhido por reunir vários pacotes de ícones populares (Font Awesome, Material Icons, Ionicons etc.) em um único pacote, com componentes React prontos para usar, sem precisar configurar fontes de ícone manualmente.

**3. Alguma dessas bibliotecas precisa ser instalada com `npx expo install` em vez de `npm install`? Por quê?**
Não. Como o projeto é web, feito com React + Vite, não existe SDK do Expo envolvido — todas as bibliotecas (`react-router-dom`, `axios`, `react-icons`) são pacotes JavaScript puros e foram instaladas normalmente com `npm install`, sem necessidade de nenhuma ferramenta de sincronização de versão nativa.

**4. Essas bibliotecas são bem mantidas e documentadas? Como o grupo verificou isso?**
Sim. O grupo verificou observando: frequência de commits e releases recentes no GitHub, número de estrelas e downloads semanais no npm, existência de documentação oficial completa (reactrouter.com, axios-http.com, react-icons.github.io) e ausência de issues críticas em aberto há muito tempo sem resposta.

**5. Existe alguma limitação ou ponto de atenção já identificado sobre alguma delas?**
O React Router (a partir da v6) mudou bastante sua API em relação a versões anteriores, então é importante seguir a documentação da versão instalada. O react-icons pode aumentar o tamanho do bundle se muitos ícones de pacotes diferentes forem importados sem cuidado — o ideal é importar apenas os ícones usados, um a um.

## 2. Arquitetura do projeto

**6. Quais telas o app vai ter e o que cada uma exibe?**
- **HomeScreen**: lista de filmes populares, exibindo pôster e título de cada um em formato de grade.
- **DetailsScreen**: informações completas do filme selecionado — pôster, título, sinopse, nota média e data de lançamento.

**7. Como os dados vão fluir entre a tela de listagem e a tela de detalhes?**
A HomeScreen busca a lista de filmes na API e renderiza os cards. Ao clicar em um filme, apenas o `id` do filme é enviado pela URL (rota `/filme/:id`) até a DetailsScreen, que lê esse `id` com `useParams` e faz uma nova requisição à API para obter os dados completos daquele filme.

**8. Por que separar o código em `screens/`, `components/` e `services/` em vez de deixar tudo em um único arquivo?**
Essa separação facilita a manutenção e a leitura do código, permite que membros do grupo trabalhem em partes diferentes do projeto sem conflitos constantes, favorece o reaproveitamento de componentes e isola responsabilidades: telas cuidam da apresentação, componentes cuidam de pedaços de UI reutilizáveis e services cuidam da comunicação externa (API).

**9. Quais componentes reutilizáveis o grupo já consegue identificar que vai precisar?**
`MovieCard` (card com pôster e título usado na listagem), `Loading` (indicador de carregamento usado em ambas as telas) e, futuramente, um componente de `Rating` (exibição de nota) e uma `SearchBar` caso seja adicionada busca.

**10. Onde ficará centralizada a lógica de comunicação com a API? Por que isso é uma boa prática?**
Em `src/services/api.js`. Centralizar essa lógica evita duplicação de código de requisição em várias telas, facilita a troca de provedor de dados ou de endpoint no futuro (bastando alterar um único arquivo) e simplifica testes e tratamento de erros de forma consistente em toda a aplicação.

## 3. Setup do projeto

**11. O projeto rodou sem erros após a instalação das bibliotecas? Se não, o que precisou ser ajustado?**
Sim, o projeto rodou sem erros após a instalação de `react-router-dom`, `axios` e `react-icons` com `npm install`, já que, por ser um projeto Vite, não há dependências nativas a sincronizar.

**12. Alguma biblioteca gerou conflito de versão? Como o grupo resolveu (ou pretende resolver)?**
Não houve conflito de versão nesse setup inicial. Caso surja incompatibilidade entre versões no futuro, a estratégia é conferir o changelog da biblioteca envolvida e, se necessário, fixar uma versão compatível no `package.json`.

## 4. README.md

**13. Por que documentar as decisões do projeto (bibliotecas, arquitetura) desde o início é importante para o grupo?**
Documentar desde o início evita retrabalho e discussões repetidas sobre decisões já tomadas, mantém todos os integrantes alinhados sobre o que foi definido e por quê, e serve como registro histórico caso alguma decisão precise ser revista mais adiante no projeto.

**14. Se outra pessoa entrasse no projeto agora, o README atual seria suficiente para ela entender o que foi decidido? Por quê?**
Sim, o README atual seria suficiente para uma primeira compreensão, pois lista as bibliotecas escolhidas com seus motivos de uso, mostra a estrutura de pastas, explica o papel de cada tela e o fluxo de dados entre elas, e traz o comando para rodar o projeto localmente.

## 5. Primeiro commit

**15. O que esse primeiro commit representa dentro do desenvolvimento do projeto?**
Representa o marco inicial do versionamento do projeto: a base estrutural (pastas, README e configuração inicial) a partir da qual todo o desenvolvimento seguinte será construído e rastreado.

**16. Por que é importante começar o versionamento desde já, e não só quando o app estiver "pronto"?**
Porque o versionamento desde o início permite acompanhar a evolução do projeto passo a passo, facilita reverter mudanças problemáticas, possibilita trabalho colaborativo simultâneo entre os integrantes do grupo por meio de branches, e evita a perda de trabalho em caso de falhas.

**17. Quais arquivos ou pastas vocês decidiram (ou vão decidir) manter fora do controle de versão, e por quê?**
`node_modules/` (gerado automaticamente pela instalação das dependências e pode ser recriado com `npm install`), `dist/` (saída de build gerada pelo Vite), arquivos `.log` e `.env` (contêm dados de ambiente e chaves sensíveis, como a chave da API, que não devem ser expostas no repositório) e `.DS_Store` (arquivo de sistema do macOS). Esses itens já estão listados no `.gitignore` do projeto.
