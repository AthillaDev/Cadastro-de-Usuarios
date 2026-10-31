# Cadastro de Usuários (Front-end)

Interface em React para cadastrar, listar, editar e excluir usuários. Consome uma API REST em Node.js com MongoDB. O projeto nasceu como estudo de React, Vite, React Router e styled-components, e foi evoluindo para uma aplicação publicada na Vercel.

## Funcionalidades

- **Cadastro** com validação por campo: mensagens de erro logo abaixo de cada campo e borda vermelha nos campos inválidos.
- **Lista** de usuários em cards, com avatar, nome, idade e e-mail.
- **Edição** em uma janela (modal) preenchida com os dados atuais, com a mesma validação do cadastro.
- **Exclusão** com confirmação antes de remover.
- **Avatares** do serviço externo. Quando a imagem não carrega, o avatar vira um círculo com as iniciais do nome.
- **Layout responsivo**, pensado para celular e computador.
- **Acessibilidade:** foco visível, rótulos ligados aos campos, mensagens anunciadas por leitores de tela, botões com nome descritivo e a janela de edição fecha com a tecla Esc.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) para desenvolvimento e build
- [React Router](https://reactrouter.com/) para a navegação entre telas
- [styled-components](https://styled-components.com/) para os estilos
- [Axios](https://axios-http.com/) para as chamadas à API
- [ESLint](https://eslint.org/) para verificar o código

### Infraestrutura

- [GitHub](https://github.com/) para o código-fonte
- [Vercel](https://vercel.com/) para publicar o front
- A API roda em [Render](https://render.com/), com banco no [MongoDB Atlas](https://www.mongodb.com/atlas). Repositório do back-end: [AthillaDev/API-Nodes](https://github.com/AthillaDev/API-Nodes).

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- A API de usuários rodando, localmente em `http://localhost:3000` ou na URL pública publicada

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do modelo:

   ```bash
   cp .env.example .env
   ```

   No Windows (PowerShell), use `copy .env.example .env`.

3. Confira o valor de `VITE_API_URL` no `.env`. O padrão é `http://localhost:3000`.

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

5. Acesse o endereço mostrado no terminal, geralmente `http://localhost:5173`.

Se alterar o `.env`, reinicie o `npm run dev`. O Vite só lê essas variáveis na inicialização.

## Variáveis de ambiente

| Variável | Para que serve | Exemplo |
|---|---|---|
| `VITE_API_URL` | Endereço base da API | `http://localhost:3000` |

Toda variável usada pelo front precisa começar com `VITE_`. Essas variáveis ficam visíveis no código publicado, então nunca coloque senhas ou chaves secretas aqui. Senhas do banco ficam só no back-end.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Sobe um servidor local para testar o build |
| `npm run lint` | Verifica o código com o ESLint |

## Integração com a API

As chamadas ficam em `src/services/usuarios.js`, e as telas nunca usam o Axios diretamente.

| Função | Método e rota | Usada em |
|---|---|---|
| `listarUsuarios()` | `GET /usuarios` | Lista |
| `cadastrarUsuario(usuario)` | `POST /usuarios` | Cadastro |
| `atualizarUsuario(id, usuario)` | `PUT /usuarios/:id` | Edição |
| `excluirUsuario(id)` | `DELETE /usuarios/:id` | Lista |

A API também tem `PATCH /usuarios/:id`, que altera só os campos enviados. O front não usa essa rota, porque o formulário de edição sempre envia os quatro campos.

## Deploy na Vercel

1. Na Vercel, clique em **Add New → Project** e escolha o repositório.
2. A Vercel detecta o Vite sozinha. Confira os campos em **Build & Development Settings**:
   - **Install Command:** `npm ci`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Em **Settings → Environment Variables**, crie:
   - **Key:** `VITE_API_URL`
   - **Value:** a URL pública da API, com `https://` e sem barra no final
   - **Tipo:** Configuração
4. Faça um **Redeploy** sempre que alterar uma variável. O Vite grava o valor no código durante o build.

O arquivo `vercel.json` na raiz faz com que a Vercel entregue o `index.html` em qualquer endereço. Assim, a página `/lista-de-usuarios` funciona ao ser recarregada ou aberta diretamente.

## Estrutura do projeto

```
src/
├── main.jsx                  → ponto de entrada
├── routes.jsx                → rotas (URL → página)
├── assets/                   → imagens e ícones
├── components/
│   ├── Avatar/               → avatar com fallback para as iniciais
│   ├── Button/               → botão com temas "primary" e "secondary"
│   ├── ModalEdicao/          → janela de edição de usuário
│   └── TopBackground/        → faixa com imagem no topo
├── pages/
│   ├── Home/                 → tela de cadastro
│   └── ListUsers/            → tela de lista, edição e exclusão
├── services/
│   ├── api.js                → cliente HTTP (endereço da API)
│   └── usuarios.js           → funções de listar, cadastrar, editar e excluir
├── styles/
│   ├── GloblaStyles.js       → estilos globais
│   └── shared.js             → estilos compartilhados entre as telas
└── utils/
    └── validarUsuario.js     → regras de validação do formulário
```

Cada página e componente tem um `index.jsx` com a lógica e um `styles.js` com o visual.

## Observações

- **Validação:** o front aceita idades de 1 a 120. A API aceita de 0 a 150. Um valor fora do intervalo do front nunca chega à API.
- **Avatares:** as imagens vêm do serviço [Avatars Placeholder](https://github.com/mhshariatipour1378/Avatars-Placeholder). O serviço devolve imagens aleatórias mesmo com o parâmetro `username`, então a imagem pode mudar entre os carregamentos. Isso é um comportamento do serviço.
- **Gênero e avatar:** `masculino` usa o conjunto `/boy` e `feminino` usa `/girl`, conforme a documentação do serviço. O mapeamento está em `src/pages/ListUsers/index.jsx`.
- **Usuários antigos:** registros criados antes da escolha de gênero não têm esse campo e recebem um avatar genérico.
- **Primeira carga no Render:** no plano gratuito, a API entra em repouso depois de um tempo sem acesso. A primeira requisição pode demorar cerca de um minuto.

## Licença

Projeto de estudo, sem licença definida.
