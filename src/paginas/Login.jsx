import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"


function Login(){

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")

    const navigate = useNavigate()

    const entrar = async (event) => {
        event.preventDefault()
        setMensagem("")

        try {

            const verificarAcesso = await signInWithEmailAndPassword(
                auth,
                email,
                senha
            )
            verificarAcesso()
            setMensagem("Usuário logado com sucesso!")
            navigate("/principal")

        } catch (erro) {
            console.log(erro)
            if (erro.code === "auth/invalid-email") {
                setMensagem("E-mail inválido.")
            } else if (erro.code === "auth/user-not-found"){
                setMensagem("Usuário não encontrado.")
            } else if (erro.code === "auth/wrong-password") {
                setMensagem("Senha incorreta.")
            } else if (erro.code === "auth/invalid-credential") {
                setMensagem("E-mail ou senha incorretos.")
            } else {
                setMensagem("Não foi possível realizar o login.")
            }
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={entrar}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={email} onChange={(event)=> setEmail(event.target.value)} placeholder="seu@email.com" required />
                <br />

                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" value={senha} onChange={(event)=> setSenha(event.target.value)} placeholder="Sua senha" required />
                <br />

                <button type="submit">Entrar</button>
                <br />
                {mensagem && <p>{mensagem}</p>}
            </form>
            
            <p>Não possuí conta?</p>
            <br />
            <button type="button" onClick={()=> navigate("/cadastro")}>Cadastre-se</button>
        </div>
    )
}

export default Login