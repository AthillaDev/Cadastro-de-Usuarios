# Contexto do projeto (para retomar o trabalho)

Este arquivo resume o estado do projeto e as decisões tomadas durante o desenvolvimento. Serve para retomar o trabalho sem precisar reconstruir o histórico.

## Visão geral

- **Front-end (este repositório):** React 19 + Vite, React Router, styled-components, Axios.
  - Repositório: https://github.com/AthillaDev/Cadastro-de-Usuarios
  - Publicado na Vercel: https://cadastro-de-usuarios-fawn.vercel.app
- **Back-end (repositório separado):** Node.js + Express 5 + Prisma + MongoDB Atlas.
  - Repositório: https://github.com/AthillaDev/API-Nodes
  - Publicado no Render: https://api-nodes-bt6u.onrender.com
- **Serviço externo de avatares:** https://avatarapi.runflare.run/public (documentado em https://github.com/mhshariatipour1378/Avatars-Placeholder)

O projeto é de estudo. A proposta de trabalho foi evoluir uma tarefa por vez, com explicação didática de cada mudança.

## Funcionalidades prontas

- **Cadastro** (`src/pages/Home`): nome, idade, e-mail e gênero, com validação por campo e mensagens de erro e sucesso no próprio formulário.
- **Lista** (`src/pages/ListUsers`): cards com avatar, nome, idade e e-mail. Carregamento e lista vazia com mensagem.
- **Edição:** botão "Editar" em cada card, que abre uma janela (`src/components/ModalEdicao`) preenchida com os dados atuais. Usa a mesma validação do cadastro e fecha com Esc ou clicando fora.
- **Exclusão:** botão de lixeira com confirmação antes de remover.
- **Avatares:** imagem do serviço externo. Se a imagem falhar, o componente `Avatar` mostra um círculo com as iniciais do nome (ex.: "AN" para "Alan Nobrega").
- **Responsividade:** nome e idade empilham em telas até 500px, o título diminui com `clamp`, a lista vira uma coluna até 750px.
- **Acessibilidade:** foco visível, rótulos ligados aos campos (`htmlFor`), `aria-invalid` e `aria-describedby` nos erros, `role="alert"`/`"status"` nas mensagens, botões com `aria-label`, texto alternativo nos avatares.

## Arquitetura do front-end

```
src/
├── main.jsx                  → ponto de entrada (StrictMode, GlobalStyle, RouterProvider)
├── routes.jsx                → "/" (Home) e "/lista-de-usuarios" (ListUsers)
├── assets/                   → imagens e ícones
├── components/
│   ├── Avatar/               → imagem com fallback para iniciais (estado por avatar)
│   ├── Button/               → botão com temas "primary" e "secondary" (CSS por função)
│   ├── ModalEdicao/          → janela de edição (formulário controlado)
│   └── TopBackground/        → faixa com imagem no topo
├── pages/
│   ├── Home/                 → cadastro (campos com useRef)
│   └── ListUsers/            → lista, edição e exclusão
├── services/
│   ├── api.js                → instância do Axios; baseURL vem de VITE_API_URL
│   └── usuarios.js           → listarUsuarios, cadastrarUsuario, atualizarUsuario, excluirUsuario
├── styles/
│   ├── GloblaStyles.js       → estilos globais (nome do arquivo tem esse typo, mantido)
│   └── shared.js             → Conteiner, Title e Mensagem usados nas duas telas
└── utils/
    └── validarUsuario.js     → regras de validação; devolve { campo: mensagem }
```

Decisões relevantes:
- Telas **não chamam o Axios diretamente**; passam pela camada `services/`.
- Validação fica em `utils/`, sem depender de React, para ser reaproveitada no cadastro e na edição.
- Cadastro usa `useRef` (campos não controlados). A edição usa estado (campos controlados), porque precisa preencher e validar valores iniciais.
- A prop `$tipo` (com `$`) é um *transient prop* do styled-components: não chega ao DOM e evita o aviso de prop desconhecida.
- Os estilos inline foram removidos do JSX e movidos para os `styles.js`.

## Arquitetura do back-end (resumo)

Fluxo: **rota → validação → controller → service → Prisma → MongoDB**.
- Rotas: `GET /usuarios`, `GET /usuarios/:id`, `POST /usuarios`, `PUT /usuarios/:id`, `PATCH /usuarios/:id`, `DELETE /usuarios/:id`.
- Validação: `name` não vazio; `age` inteiro de 0 a 150; `email` no formato `algo@algo.algo` e único; `genero` é `masculino` ou `feminino` (registros antigos podem não ter).
- Erros centralizados em `middlewares/erros.js`; conexão única em `lib/prisma.js`.
- O front usa GET, POST, PUT e DELETE. O PATCH existe, mas não é usado.

## Decisões de avatar

- O serviço de avatares devolve imagens **aleatórias** mesmo com `username`. A imagem não muda ao recarregar a mesma URL (é fixa por `username`), mas diferentes usuários recebem imagens diferentes.
- Mapeamento confirmado em teste visual: `masculino → /boy` e `feminino → /girl` (é o que a documentação do serviço diz). Houve uma inversão feita por engano antes, que foi desfeita.
- Usuários sem `genero` recebem a URL genérica (`/public?username=...`).
- Se a imagem falhar, aparecem as iniciais.

## Deploy

**Front na Vercel:**
- Install Command: `npm ci`
- Build Command: `npm run build` (havia um override para `yarn run build`, que foi trocado para npm)
- Output Directory: `dist`
- Variável: `VITE_API_URL` com a URL pública do back, tipo **Configuração** (não Segredo). Variáveis `VITE_` vão para o navegador; nunca colocar segredos aí.
- Toda alteração de variável exige **Redeploy** (sem cache de build), porque o Vite grava o valor no código durante o build.
- `vercel.json` com rewrite para `/index.html`, para que `/lista-de-usuarios` não dê 404 ao recarregar.

**Back no Render:** Build `npm install && npx prisma generate`, Start `npm start`, variável `DATABASE_URL` no painel. O plano gratuito dorme após 15 minutos sem acesso (primeira chamada pode levar ~1 min).

## Problemas já resolvidos (para não repetir)

- **Aviso de workspaces e "Unknown word" do Yarn no build da Vercel:** havia um `yarn.lock` commitado no GitHub. Foi removido do repositório e adicionado ao `.gitignore`. O projeto usa só npm.
- **`npm ci` falhando na Vercel:** o `package-lock.json` estava fora de sincronia com o `package.json`. Resolvido rodando `npm install` localmente e commitando o lock atualizado.
- **Vulnerabilidades:** `npm audit fix` (sem `--force`). Restaram vulnerabilidades moderadas em ferramentas de desenvolvimento (ESLint, Vite dev server), que não vão para o site publicado.
- **Aviso `Unknown env config "cache-dir"`:** configuração antiga do npm, sem efeito no build. Pode ser ignorado.
- **`Unknown prop "tipo"` no console:** resolvido com transient prop (`$tipo`).
- **Botões colados após mensagens de erro no cadastro:** resolvido com `margin-bottom` no formulário.
- **Lixeira saindo do card com nomes/e-mails longos:** resolvido com `min-width: 0`, `overflow-wrap: anywhere` e `flex-shrink: 0`.
- **"VP" aparecendo como "Vice-presidente":** o Chrome traduziu as iniciais. Resolvido com `translate="no"` no elemento das iniciais.
- **Gênero não salvo:** o back passou a salvar o campo (confirmado com novo cadastro).

## Pendências e ideias futuras

- Opcional: trocar o Build Command por `npm run build` (já feito) e revisar as vulnerabilidades moderadas com `npm audit`.
- Opcional: testes automatizados (não há nenhum hoje).
- Opcional: unificar as mensagens de erro do cadastro e da lista (já usam o mesmo componente `Mensagem`).
- Opcional: fallback do `api.js` para `localhost:3000` pode ser trocado por erro explícito quando `VITE_API_URL` não existir em produção.
- Divulgação: post para LinkedIn (rascunho pronto na conversa), com seção de arquitetura. Sugerido fixar o post e os links (site e repositório) no campo **Destaque** do perfil.

## Como retomar

1. Ler este arquivo e o `README.md`.
2. Rodar `npm install`, criar `.env` a partir de `.env.example` e executar `npm run dev`. O back precisa estar rodando (localmente em `http://localhost:3000` ou usando a URL publicada no `.env`).
3. Conferir `git status` antes de qualquer commit. Não commitar `.env`, `node_modules` nem `dist` (já estão no `.gitignore`).
4. Para publicar mudanças: `git add`, `git commit` e `git push`. A Vercel faz o deploy automaticamente.

## Preferências de trabalho (do usuário)

- Explicações didáticas, linha por linha, em português do Brasil.
- Uma funcionalidade ou tópico por vez, com explicação antes de seguir para o próximo.
- Quando algo depende de outro sistema (back, serviço de avatares), confirmar antes de presumir.
