# Cadastro de Usuários

Aplicação em React para cadastrar usuários e listá-los, com exclusão e avatares gerados por um serviço externo. Foi feita para estudo de React, Vite, React Router e styled-components.

## Funcionalidades

- **Cadastro:** formulário com nome, idade, e-mail e gênero, com validação por campo e mensagens de erro e sucesso.
- **Lista:** cards com avatar, nome, idade e e-mail de cada usuário.
- **Exclusão:** botão de lixeira com confirmação antes de remover.
- **Acessibilidade:** foco visível, rótulos ligados aos campos, mensagens anunciadas por leitores de tela e botões com nome descritivo.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [styled-components](https://styled-components.com/)
- [Axios](https://axios-http.com/)
- ESLint

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Uma API REST rodando localmente, com as rotas `GET /usuarios`, `POST /usuarios` e `DELETE /usuarios/:id`

Cada usuário enviado à API tem o formato:

```json
{
  "id": "gerado pela API",
  "name": "Maria Silva",
  "email": "maria@exemplo.com",
  "age": 27,
  "genero": "feminino"
}
```

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo de configuração a partir do modelo:

   ```bash
   cp .env.example .env
   ```

   No Windows (PowerShell), use `copy .env.example .env`.

3. Confira o valor de `VITE_API_URL` no `.env`. O padrão é `http://localhost:3000`.

4. Inicie a API e, em seguida, a aplicação:

   ```bash
   npm run dev
   ```

5. Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173`).

Se alterar o `.env`, reinicie o `npm run dev`. O Vite só lê essas variáveis na inicialização.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Sobe um servidor local para testar o build |
| `npm run lint` | Verifica o código com o ESLint |

## Estrutura de pastas

```
src/
├── main.jsx                 → ponto de entrada
├── routes.jsx               → rotas (URL → página)
├── assets/                  → imagens e ícones
├── components/              → peças reutilizáveis
│   ├── Button/              → botão com temas "primary" e "secondary"
│   └── TopBackground/       → faixa com imagem no topo
├── pages/
│   ├── Home/                → tela de cadastro
│   └── ListUsers/           → tela de lista e exclusão
├── services/
│   ├── api.js               → cliente HTTP (endereço da API)
│   └── usuarios.js          → funções de listar, cadastrar e excluir
├── styles/
│   ├── GloblaStyles.js      → estilos globais
│   └── shared.js            → estilos compartilhados entre as telas
└── utils/
    └── validarUsuario.js    → regras de validação do formulário
```

Cada página tem um `index.jsx` com a lógica e um `styles.js` com o visual.

## Observações

- **Avatares:** as imagens vêm do serviço externo [Avatars Placeholder](https://github.com/mhshariatipour1378/Avatars-Placeholder). Os avatares são aleatórios mesmo com o parâmetro `username`, então a imagem pode mudar ao recarregar a página. Isso é um comportamento do serviço.
- **Gênero e avatar:** `masculino` usa o conjunto `/boy` e `feminino` usa `/girl`, conforme a documentação do serviço. O mapeamento está em `src/pages/ListUsers/index.jsx`.
- **Usuários antigos:** registros criados antes da escolha de gênero não têm o campo `genero` e recebem um avatar genérico.

## Licença

Projeto de estudo, sem licença definida.
