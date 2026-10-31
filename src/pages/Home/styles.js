// Estilos exclusivos da tela de cadastro.
import styled from "styled-components"

// Formulário em coluna, com espaço entre os blocos.
export const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 500px;
    /* Garante espaço até o botão "Ver Lista", mesmo quando as mensagens de erro aumentam o formulário. */
    margin-bottom: 40px;
`

// Linha que agrupa nome e idade lado a lado.
export const ConteinerInput = styled.div`

    display: flex;
    gap: 20px;

    /* Em telas estreitas, nome e idade empilham em vez de ficar apertados lado a lado. */
    @media (max-width: 500px) {
        flex-direction: column;
    }
`

// Bloco que ocupa toda a largura do formulário (rótulo + campo + erro).
export const Campo = styled.div`

    width: 100%;
`

// Campo de texto. O estilo de erro vem do atributo aria-invalid="true", definido no componente.
export const Input = styled.input`

   border-radius: 10px;
   border: 1px solid #d2dae2;
   background-color: #fff;
   padding: 20px;
   outline: none;
   width: 100%;
   /* 16px ou mais evita que o iPhone aplique zoom automático ao focar o campo. */
   font-size: 16px;

   /* Como "outline" foi removido, este anel mantém o foco visível para teclado. */
   &:focus {
     box-shadow: 0 0 0 3px #fe7e5d;
   }

   &[aria-invalid="true"] {
     border: 2px solid #ff8a80;
   }
`

// Texto de erro exibido abaixo de cada campo inválido.
export const ErroCampo = styled.span`

    display: block;
    margin-top: 6px;
    font-size: 13px;
    color: #ff8a80;
`

// Rótulo dos campos. O asterisco (*) indica campo obrigatório.
export const InputLabel = styled.label`

    color: #fff;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;

    span{
        color: #ef4f45;
        font-weight: bold;
    }
`
