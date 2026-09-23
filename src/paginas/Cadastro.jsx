import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Cadastro(){
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [confirmarEmail, setConfirmarEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const navigate = useNavigate()

    const salvarCadastro = (event) => {
        event.preventDefault()
        if (!nome || !sobrenome || !dataNascimento || !email || !confirmarEmail || !senha || !confirmarSenha) {
            window.alert('Obrigatório preencher todos os campos.')
            return
        }

        // futuramente preencher aqui com o código para salvar o formulário no firebase

        console.log("Usuário cadastrado com sucesso!", {nome, sobrenome, dataNascimento, email})
        navigate("/")

    }

    return(
        <div>
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={salvarCadastro}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value={nome} onChange={(event)=> setNome(event.target.value)} placeholder="Seu nome" required />
                    <br />

                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" value={sobrenome} onChange={(event) => setSobrenome(event.target.value)} placeholder="Seu sobrenome" required />
                    <br />

                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <input type="date" value={dataNascimento} onChange={(event)=> setDataNascimento(event.target.value)} placeholder="DD/MM/AAAA" required />
                    <br />

                    <label htmlFor="email">E-mail</label>
                    <input type="email" value={email} onChange={(event)=> setEmail(event.target.value)} placeholder="seu@email.com" required />
                    <br />

                    <label htmlFor="confirmarEmail">Confirmar e-mail</label>
                    <input type="email" value={confirmarEmail} onChange={(event)=> setConfirmarEmail(event.target.value)} placeholder="seu@email.com" required />
                    <br />

                    <label htmlFor="senha">Senha</label>
                    <input type="password" value={senha} onChange={(event)=> setSenha(event.target.value)} placeholder="Sua senha" required />
                    <br />

                    <label htmlFor="confirmarSenha">Confirmar senha</label>
                    <input type="password" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} placeholder="Confirme a sua senha" required />
                    <br />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Cadastro