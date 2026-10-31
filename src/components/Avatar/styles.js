// Estilos do avatar: a imagem do serviço ou o círculo com as iniciais.
import styled from "styled-components";

// Imagem do avatar com tamanho fixo, para o card não mudar de forma enquanto carrega.
export const AvatarImagem = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`;

// Círculo com as iniciais, usado quando a imagem não carrega. Tem o mesmo tamanho da imagem.
export const AvatarIniciais = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fe7e5d 0%, #FF6378 100%);
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  user-select: none;
`;
