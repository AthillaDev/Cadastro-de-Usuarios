// Estilos globais, aplicados a toda a página pelo componente <GlobalStyle /> em main.jsx.
import {createGlobalStyle} from "styled-components"

export const GlobalStyle = createGlobalStyle `
    /* Zera espaçamentos padrão do navegador e faz o padding entrar na largura dos elementos. */
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
    }
`
