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
