// Estilos compartilhados entre as telas (cadastro e lista).
import styled from "styled-components";

// Container principal da tela: ocupa pelo menos a altura da janela e centraliza o conteúdo.
export const Conteiner = styled.div`
  background-color: #181f36;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 38px;
  font-weight: 800;
  font-style: normal;
  text-align: center;
  margin-top: 30px;
`;

// Mensagem de feedback (erro ou sucesso). A cor muda conforme a prop "$tipo".
// O prefixo "$" faz com que a prop seja usada só pelo estilo e não chegue ao HTML.
export const Mensagem = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.$tipo === "sucesso" ? "#4ade80" : "#ff8a80")};
`;
