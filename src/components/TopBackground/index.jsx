// Faixa decorativa com gradiente e imagem no topo das telas.
import UsersImg from "../../assets/users.png"
import { Background } from "./styles.js"

function TopBackground(){

    return(
        <Background >
            <img src={UsersImg} alt="Imagem-Usuários" />
        </Background>

    )
}

export default TopBackground
