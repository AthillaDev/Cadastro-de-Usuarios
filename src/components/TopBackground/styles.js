import styled from "styled-components"

// Caixa com gradiente. A largura usa 90vw (90% da tela) e limita a 800px em telas grandes.
export const Background = styled.div`

    background: linear-gradient(to right, #fe7e5d, #7f3841);
    height: 300px;
    width: 90vw;
    max-width: 800px;
    border-radius: 30px;

    display: flex;
     align-items: center;
     justify-content: center;

    /* A imagem se ajusta à caixa sem ultrapassar suas bordas. */
    img{
     max-width: 100%;
     max-height: 100%;
    }
`
