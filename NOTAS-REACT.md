# Notas de estudo: React

Anotações feitas durante o projeto, que estavam no topo de `src/pages/Home/index.jsx`.

## Exportar e importar componentes

Existem duas formas de exportar um componente:

1. `export default App`: o padrão do React. Só uma coisa por arquivo.
2. `export { App }`: pode exportar mais de uma coisa por arquivo.

E duas formas de importar:

1. `import App from "./App"`: para o `export default`.
2. `import { App, APP2 as ABACATE } from "./App"`: para exports nomeados. `as` troca o nome na hora de importar.

## Componentes

Um componente é uma função que retorna JSX.

No `return`, o JSX precisa ter um único elemento pai. Se não quiser criar um `div` extra, use o fragment `<> </>`.

## Passando funções para `onClick`

- Função sem parâmetros: `onClick={registerNewUser}`
- Função com parâmetros: `onClick={() => navigate("/lista-de-usuarios")}`
