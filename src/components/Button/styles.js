import styled from "styled-components";

// Estilo do botão. As funções recebem as props e escolhem o visual conforme "theme":
// "primary" usa o gradiente laranja; qualquer outro valor usa fundo transparente com borda branca.
export const Button = styled.button`
  border: ${(props) => (props.theme === "primary" ? "none" : "1px solid #fff")};
  background: ${(props) =>
    props.theme === "primary"
      ? "linear-gradient(180deg, #fe7e5d 0%, #FF6378 100%)"
      : "transparent"};
  font-size: 16px;
  color: #fff;
  padding: 16px 32px;
  width: fit-content;
  cursor: pointer;
  border-radius: 30px;

  &:hover {
     opacity: 0.8;
    /* No botão secundário, o hover inverte para fundo branco com texto azul.
       O bloco só é aplicado quando o tema não é "primary" (o && descarta o CSS caso contrário). */
    ${(props) =>
      props.theme !== "primary" &&
      `
      background: #fff;
      color: #1e3a8a;
    `}
  }

  &:active {
    opacity: ${(props) => (props.theme === "primary" ? 0.6 : 0.4)};

  }
`;
