// Botão padrão do projeto. Repassa todas as props ao botão estilizado e aceita a prop "theme".
import { Button } from "./styles.js"

/**
 * @param {object} props
 * @param {string} [props.theme] - "primary" para o botão com gradiente; qualquer outro valor usa o estilo secundário.
 * @param {React.ReactNode} props.children - texto ou conteúdo do botão.
 * Demais props (type, onClick, etc.) são repassadas diretamente ao <button>.
 */
function DefaultButton({ children, theme, ...props }){

    return(
        <Button {...props} theme={theme}>
            {children}
        </Button>
    )
}

export default DefaultButton
