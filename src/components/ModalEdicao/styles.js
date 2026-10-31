// Estilos da janela de edição de usuário.
import styled, { css } from "styled-components";

// Fundo escuro que cobre a tela inteira e centraliza a janela.
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 10;
`;

// A janela em si. Se o conteúdo for alto demais, ela rola internamente.
export const Dialogo = styled.div`
  background-color: #252d48;
  color: #fff;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Titulo = styled.h2`
  font-size: 24px;
  text-align: center;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// Bloco de cada campo: rótulo, input e mensagem de erro.
export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Rotulo = styled.label`
  font-size: 14px;
`;

// Estilo base de input e select. Fica em uma variável para os dois ficarem idênticos.
const estiloCampo = css`
  border-radius: 10px;
  border: 1px solid #d2dae2;
  background-color: #fff;
  color: #181f36;
  padding: 12px;
  font-size: 16px; /* 16px evita o zoom automático no iPhone */
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #fe7e5d;
  }

  &[aria-invalid="true"] {
    border: 2px solid #ff8a80;
  }
`;

export const Input = styled.input`
  ${estiloCampo}
`;

export const Select = styled.select`
  ${estiloCampo}
`;

export const ErroCampo = styled.span`
  font-size: 13px;
  color: #ff8a80;
`;

// Erro que não é de um campo específico, como falha ao salvar na API.
export const ErroGeral = styled.p`
  color: #ff8a80;
  font-weight: bold;
  text-align: center;
`;

// Linha de botões (cancelar e salvar), alinhados à direita.
export const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;
