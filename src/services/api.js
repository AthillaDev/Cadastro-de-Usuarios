// Cliente HTTP configurado para a API. Todas as chamadas do projeto passam por aqui.
import axios from "axios"

// baseURL é o endereço da API. Vem da variável VITE_API_URL do arquivo .env;
// se ela não existir, usa o endereço local como padrão.
// Para trocar de servidor, altere o .env e reinicie o "npm run dev".
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
})

export default api
