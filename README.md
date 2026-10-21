# La belle de jour

Biblioteca digital de receitas de crochê e espaço para projetos do ateliê. React, Vite, Markdown e CSS. Site estático, sem backend ou banco de dados.

## Desenvolvimento local

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Adicionar uma receita

1. Crie um arquivo `.md` em `/receitas`, usando um dos exemplos como modelo.
2. Preencha o frontmatter: `titulo`, `categoria`, `nivel`, `tempo`, `fio`, `agulha`, `imagem`, `descricao`, `tags` e `data` (AAAA-MM-DD).
3. Escreva as seções da receita em Markdown.
4. Adicione a foto em `public/images/` e informe `imagem: "/images/nome.jpg"`. Enquanto não tiver foto, use `imagem: ""`.
5. Faça commit e push para `main`: o GitHub Actions criará a nova versão automaticamente. Não é preciso mudar o React.

Os arquivos são lidos por `src/data/recipes.js` durante o build. Essa camada de dados poderá ser substituída por uma API futuramente.

## GitHub Pages

Crie um repositório no GitHub, envie este projeto para `main` e selecione **GitHub Actions** em **Settings → Pages → Build and deployment**. O workflow em `.github/workflows/deploy.yml` faz o deploy a cada push. As rotas usam `#` para funcionar no GitHub Pages, e o `base` do Vite é configurado pelo nome do repositório no Actions.

As duas receitas são demonstrativas e precisam ser testadas antes do uso. A seção Projetos e o texto Sobre aguardam fotos e informações reais.

## Organização das páginas

As telas estão em `src/pages/`: `Home.jsx`, `Library.jsx`, `Recipe.jsx`, `Projects.jsx` e `About.jsx`. `src/App.jsx` conecta as rotas, e `src/components/Layout.jsx` contém os elementos compartilhados.

## Sua foto na página inicial

Coloque sua foto em `src/assets/foto-criadora.jpg` (também aceita `.jpeg`, `.png` ou `.webp`) e execute `npm run dev` ou faça o build novamente. A página inicial trocará automaticamente o espaço “Sua foto aqui” pela imagem. Prefira uma foto vertical com espaço em torno do rosto; o enquadramento é ajustado com `object-fit: cover` na classe `.portrait-frame img`.

## Letreiro e cores

O letreiro da Home está em `src/assets/la-belle-de-jour-letreiro.png`. A identidade usa azul `#224C98`, azul claro `#6495ED` e variações suaves. A textura de papel fica em `public/images/papel-quadriculado.png`.

## Variante com fundo J

Esta versão mantém a mesma estrutura e usa o arquivo enviado `public/images/fundo-J.jpg` como imagem de fundo da tela inicial. A imagem é carregada localmente pelo site; não depende de uma URL externa. A foto da criadora continua opcional em `src/assets/foto-criadora.jpg`.

## Organização das páginas

As telas estão em `src/pages/`: `Home.jsx`, `Library.jsx`, `Recipe.jsx`, `Projects.jsx` e `About.jsx`. `src/App.jsx` conecta as rotas, e `src/components/Layout.jsx` contém os elementos compartilhados.

## Composição da tela inicial

A Home segue a referência enviada: letreiro ampliado à esquerda, retrato em moldura inclinada à direita, botão abaixo do título e três chamadas sob o retrato. A foto mostrada na referência não foi incorporada: para usar sua foto real, adicione `src/assets/foto-criadora.jpg` e execute o build novamente.

## Ateliê digital

### Catálogo e fotos do Instagram

A página **Peças do ateliê** substitui a antiga página Projetos; `/projetos` continua funcionando. Para adicionar uma peça:

1. Copie `pecas/modelo.md` para `pecas/nome-da-peca.md`.
2. Preencha título, categoria, descrição, disponibilidade e detalhes reais.
3. Coloque suas fotografias em `public/images/pecas/` e preencha `fotos` com `caminho` e `legenda`.
4. Defina o preço: `type: fixed` (fixo), `from` (a partir de), `range` (faixa, com `min` e `max`) ou `quote` (sob consulta). Use números em reais, com ponto decimal, sem `R$`. Descreva os fatores que alteram o preço em `variacao_preco`.
5. Use um dos status: `Pronta entrega`, `Sob encomenda` ou `Portfólio`. Peças de portfólio não exibem formulário de encomenda.
6. Cole o endereço HTTPS do post no campo `instagram`. A seção **Do Instagram para o ateliê** utiliza a primeira foto local e o link informado. A galeria é uma seleção manual, sem importação automática ou dependência da API do Instagram.
7. Opcionalmente preencha `receita` com o slug de uma receita existente e `bastidores` com título, texto e foto de cada etapa.
8. Somente quando os dados estiverem prontos, altere `publicado: false` para `publicado: true`.

O modelo permanece como rascunho: não é exibido como peça real e não contém valores ou fotos inventados. Enquanto não houver peças publicadas, o catálogo mostra seis cards de prévia com espaço para fotografias e um convite para conhecer o Instagram. Assim que você publicar a primeira peça, os cards de prévia dão lugar aos cards das peças reais, com filtros e links para os detalhes. A quantidade de peças publicadas não é limitada a seis.

Por exemplo, salve uma foto em `public/images/pecas/minha-peca.jpg`, copie o modelo para `pecas/minha-peca.md`, preencha os dados e substitua `fotos: []` por:

```yaml
fotos:
  - caminho: "/images/pecas/minha-peca.jpg"
    legenda: "Descrição da fotografia da minha peça"
```

Depois, defina `publicado: true`. Para mostrar uma criação apenas como trabalho já feito, use `status: "Portfólio"`.

### Contato para encomendas

Preencha `whatsapp` em `src/data/atelier.js` com o telefone comercial autorizado, incluindo país e DDD, só dígitos. Com um número válido, o botão abre uma mensagem com peça, tamanho e cor selecionados. Sem número, o botão leva ao perfil do Instagram e orienta a informar as preferências na conversa. O site não recebe pagamentos nem confirma pedidos, estoque ou prazos automaticamente.

### Ferramentas

- **Consumo de fio:** estima o peso por área a partir de uma amostra feita com o mesmo fio, ponto, tensão e agulha. Some as áreas de todas as partes; a margem é aplicada uma única vez. Usa a metragem e o peso do rótulo para converter em metros e novelos inteiros.
- **Novelos e medidas:** converte metragem em novelos e calcula pontos e carreiras pela amostra. O resultado precisa respeitar os múltiplos do ponto e as bordas da receita.
- **Comparativo de fios:** permite cadastrar os dados do rótulo, preço e observações. Calcula TEX aproximado e custo por 100 m. Os fios cadastrados ficam apenas no navegador da visitante.

### Acompanhamento das receitas

As etapas numeradas do Markdown viram uma lista de acompanhamento. Cada receita tem contador de carreiras, marcação de etapas e reinício com confirmação. Os dados ficam em `localStorage`, separados por receita, sem conta ou sincronização. Alterar o texto de uma etapa faz essa etapa aparecer desmarcada novamente. Navegadores que bloqueiam o armazenamento exibem aviso e mantêm o progresso apenas na sessão.

### Verificação

```bash
npm test
npm run build
```

Os testes verificam cálculos de consumo, margem, conversão de novelos, amostra e comparação de fios. O workflow de PR valida testes e build com o caminho de produção do GitHub Pages.
