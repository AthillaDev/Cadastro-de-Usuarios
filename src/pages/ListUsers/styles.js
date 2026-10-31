// Estilos exclusivos da tela de lista de usuários.
import styled from "styled-components";

// Texto simples de carregamento ou de lista vazia.
export const Aviso = styled.p`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

// Grade de cards: duas colunas em telas largas e uma coluna em telas até 750px.
export const ConteinerUsers = styled.div`

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0;

  @media (max-width: 750px) {

  grid-template-columns: 1fr;
  }
`;

// Card de cada usuário: avatar, dados e botão de excluir em linha.
export const CardUsers = styled.div`

  background-color: #252d48;
  padding: 16px;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  max-width: 380px;

  /* min-width: 0 permite que o bloco de texto encolha, e overflow-wrap quebra e-mails longos.
     Sem isso, o texto empurra o botão de excluir para fora do card. */
  > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  h3 {
    color: #fff;
    font-size: 20px;
    margin-bottom: 4px;
    text-transform: capitalize;
  }

  p {
    color: #fff;
    font-size: 15px;
    font-weight: 200;
  }
`;

// Agrupa os botões de ação do card (editar e excluir) lado a lado.
export const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

// Botão de editar. Usa texto, para ficar claro o que ele faz.
export const BotaoEditar = styled.button`

  background: none;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }
`;

// Botão da lixeira. É um <button> para funcionar com teclado e leitores de tela.
export const BotaoExcluir = styled.button`

  background: none;
  border: none;
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }
`;

