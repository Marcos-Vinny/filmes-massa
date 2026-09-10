Catálogo de Filmes — MVP: Perguntas e Respostas
1. Tela de listagem

Como ficou a estrutura do componente de card de filme? Ele foi feito para ser reutilizado em outros pontos do app?
O MovieCard recebe um único prop, movie (objeto com id, title e poster_path), e não depende de nada específico da HomeScreen. Ele mesmo cuida da navegação ao ser clicado. Por não ter nenhuma lógica presa à tela onde está, pode ser reutilizado em qualquer lista de filmes do app (por exemplo, numa futura tela de busca ou de favoritos).

De onde vêm os dados exibidos na lista — de uma chamada direta à API na própria tela ou de uma função centralizada em services/?
Vêm de getPopularMovies(), centralizada em src/services/api.js. A HomeScreen só chama essa função e guarda o resultado no estado; ela não monta a URL da API nem faz o axios.get diretamente.

O que acontece na tela enquanto os dados ainda estão sendo carregados?
O componente Loading é exibido no lugar da lista enquanto loading é true. Só depois que a requisição termina (com sucesso ou erro) é que a lista ou a mensagem de erro aparece.

2. Navegação e tela de detalhes

Qual biblioteca de navegação foi usada e como os dados do filme selecionado são passados para a tela de detalhes?
react-router-dom. Ao clicar num card, navigate('/filme/:id', { state: { movie } }) é chamado, enviando o objeto completo do filme pelo state da navegação (não só o id).

A tela de detalhes busca os dados novamente na API ou reaproveita os dados recebidos da tela de listagem? Qual foi a decisão do grupo e por quê?
As duas coisas, dependendo do caso. Se o filme veio pelo state (fluxo normal: clicou num card da Home), a tela usa esses dados direto, sem nova chamada à API — é mais rápido e evita requisição redundante. Se a tela for aberta sem esse state (ex: o usuário atualiza a página com F5, ou acessa o link /filme/123 direto), não há dados disponíveis em memória, então a tela busca na API pelo id da URL. Essa combinação garante performance no fluxo comum sem quebrar o acesso direto pela URL.

É possível voltar da tela de detalhes para a listagem sem perder o estado da lista (ex: posição do scroll)?
Sim. O botão "Voltar" usa navigate(-1), que volta no histórico do navegador em vez de navegar para / de novo. Isso reaproveita a instância da HomeScreen que já estava montada, preservando a posição de scroll, em vez de remontar a tela do zero.

3. Tratamento de estados (loading e erro)

O que o usuário vê se a API demorar para responder? E se a requisição falhar (ex: sem internet)?
Enquanto a resposta não chega, aparece o componente Loading. Se a requisição falhar (erro de rede, API fora do ar, chave inválida etc.), o catch do axios muda o estado error para true e a tela mostra o componente ErrorMessage, com uma mensagem e um botão de tentar novamente.

O grupo implementou alguma forma de tentar novamente (retry) após um erro? Por que isso é importante em apps mobile?
Sim. Tanto a HomeScreen quanto a DetailsScreen passam uma função onRetry para o ErrorMessage, que refaz a mesma chamada que falhou. Isso é importante porque conexões mobile são instáveis (3G/4G fraco, Wi-Fi caindo, app em segundo plano) — sem um retry, o usuário precisaria fechar e abrir o app de novo para tentar carregar os dados uma segunda vez.

4. Testes manuais do MVP

Em quais dispositivos/ambientes o grupo testou o app? Quais diferenças de comportamento ou de layout foram observadas entre eles?
O grupo testou o app no navegador Opera, em um notebook, e no Google Chrome, no celular de um colega. Em ambos os ambientes o app abriu corretamente, exibindo a listagem de filmes com pôster e título e permitindo navegar até a tela de detalhes normalmente. Não foram observadas diferenças significativas de comportamento entre os dois ambientes.

Quais bugs ou comportamentos inesperados foram encontrados durante os testes manuais? Como foram corrigidos?
Não foram encontrados bugs durante os testes manuais realizados. O app se comportou de forma consistente tanto no notebook (Opera) quanto no celular (Chrome), incluindo a navegação entre a listagem e os detalhes dos filmes.

Por que testar em mais de um ambiente é especialmente importante em desenvolvimento mobile híbrido?
Porque o que funciona bem em um navegador ou dispositivo pode não funcionar da mesma forma em outro — diferenças de motor de renderização, tamanho de tela e conexão podem causar comportamentos inesperados. Testar em mais de um ambiente ajuda a garantir que o app funcione de forma consistente para todos os usuários, independente do dispositivo ou navegador que estejam usando.

5. Teste automatizado simples

Qual ferramenta de teste foi usada e por que essa foi a escolha do grupo?
Vitest + React Testing Library. O Vitest foi escolhido por já integrar nativamente com o Vite (mesma configuração, mesmo mecanismo de transformação de módulos, sem precisar configurar Babel/Jest do zero), e o Testing Library por incentivar testar o componente do jeito que o usuário o vê (texto na tela, atributos da imagem) em vez de detalhes internos de implementação.

O que exatamente o teste escrito verifica? O que ele NÃO cobre (limitações)?
Dois arquivos de teste: api.test.js verifica se getPosterUrl monta a URL corretamente e retorna null quando não há poster_path. MovieCard.test.jsx verifica se o card renderiza o título e a imagem (com src e alt corretos) a partir de um filme mockado. Eles NÃO cobrem: a navegação de fato acontecendo ao clicar, a chamada real à API (é mockada/isolada), nem os estados de loading e erro das telas — isso é o que os testes manuais da Etapa 4 cobrem.

Qual a diferença entre o que esse teste automatizado garante e o que os testes manuais da Etapa 4 garantem?
O teste automatizado garante, de forma rápida e repetível, que uma peça isolada do código (uma função, um componente com dados fixos) continua se comportando como esperado — e pode ser rodado a cada mudança, sem esforço manual. Os testes manuais garantem que o fluxo completo funciona de ponta a ponta, incluindo integração com a API real, condições de rede, diferentes dispositivos e a experiência real de uso — coisas que um teste automatizado simples como esse não cobre.

6. Documentação e commit

O que foi acrescentado ao README nesta etapa? Isso é suficiente para outra pessoa entender o estado atual do MVP?
Foi acrescentada a seção "MVP", explicando o que cada tela faz agora, como os estados de loading/erro/retry funcionam, como a navegação passa os dados do filme, quais testes existem e como rodá-los, além de como configurar a chave da API via .env. Isso é suficiente para outra pessoa entender o estado atual e rodar o projeto localmente sem precisar perguntar nada ao grupo.

O que esse commit representa em relação ao commit anterior (o do setup)? O grupo considera que o app já é um MVP utilizável? Por quê?
O commit anterior era só a estrutura vazia (pastas, config, README). Este commit entrega o fluxo completo: listar filmes, ver detalhes, tratar erro/loading e ter pelo menos um teste automatizado — ou seja, sim, já é um MVP utilizável: alguém consegue abrir o app, ver os filmes populares e conferir os detalhes de qualquer um deles.

Olhando para o app pronto até aqui, qual seria o próximo problema técnico ou funcional mais importante a resolver?
Paginação/scroll infinito na listagem (hoje só a primeira página de resultados é carregada), e um campo de busca por título, já que o grupo escolheu react-icons pensando numa SearchBar futura.