// Avatar do usuário: mostra a imagem do serviço e, se ela falhar, as iniciais do nome.
import { useState } from "react";
import { AvatarImagem, AvatarIniciais } from "./styles.js";

/**
 * Gera as iniciais do nome: primeira letra do primeiro e do último nome.
 * Exemplos: "Alan Nobrega" -> "AN", "Maria" -> "M", "" -> "?".
 * @param {string} nome
 * @returns {string}
 */
function gerarIniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";

  return (primeira + ultima).toUpperCase() || "?";
}

/**
 * @param {object} props
 * @param {string} props.src - URL da imagem do avatar.
 * @param {string} props.nome - Nome do usuário, usado no texto alternativo e nas iniciais.
 */
function Avatar({ src, nome }) {
  // Quando a imagem não carrega, o onError troca para as iniciais.
  // O estado fica em cada Avatar, então uma falha não afeta os outros cards.
  const [imagemFalhou, setImagemFalhou] = useState(false);

  if (imagemFalhou) {
    return (
      <AvatarIniciais role="img" aria-label={`Avatar de ${nome}`} translate="no">
        {gerarIniciais(nome)}
      </AvatarIniciais>
    );
  }

  return (
    <AvatarImagem
      src={src}
      alt={`Avatar de ${nome}`}
      onError={() => setImagemFalhou(true)}
    />
  );
}

export default Avatar;
