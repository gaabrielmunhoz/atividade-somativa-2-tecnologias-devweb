import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

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

    const salvarCadastro = async (event) => {
        event.preventDefault()

        setMensagem("")
        
        if (!nome || !sobrenome || !dataNascimento || !email || !confirmarEmail || !senha || !confirmarSenha) {
            window.alert('Obrigatório preencher todos os campos.')
            return
        }

        if (email !== confirmarEmail) {
            setMensagem("Os e-mails não coincidem.")
            return
        }

        if (senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem.")
            return
        }

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            )

            const usuario = credencialUsuario.user

            await setDoc(doc(db, "usuarios", usuario.uid), {
                uid: usuario.uid,
                nome: nome,
                sobrenome: sobrenome,
                dataNascimento: dataNascimento,
                email: email
            })

            setMensagem("Usuário cadastrado com sucesso!")

            await signOut(auth)
            setTimeout(()=> {navigate("/login")}, 1500)
        } catch (erro) {
            console.log(erro)

            if (erro.code === "auth/email-already-inuse"){
                setMensagem("Este e-mail já está em uso.")
            } else if (erro.code === "auth/weak-password") {
                setMensagem("A senha deve possuir pelo menos 6 caracteres.")
            } else if (erro.code === "auth/invalid-email") {
                setMensagem("Informe um e-mail válido.")
            } else {
                setMensagem("Não foi possível realizar o cadastro.")
            }
        }

        console.log("Usuário cadastrado com sucesso!", {nome, sobrenome, dataNascimento, email})
        navigate("/login")

    }

    return(
        <div>
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={salvarCadastro}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={(event)=> setNome(event.target.value)} placeholder="Seu nome" required />
                    <br />

                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" id="sobrenome" value={sobrenome} onChange={(event) => setSobrenome(event.target.value)} placeholder="Seu sobrenome" required />
                    <br />

                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <input type="date" id="dataNascimento" value={dataNascimento} onChange={(event)=> setDataNascimento(event.target.value)} placeholder="DD/MM/AAAA" required />
                    <br />

                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(event)=> setEmail(event.target.value)} placeholder="seu@email.com" required />
                    <br />

                    <label htmlFor="confirmarEmail">Confirmar e-mail</label>
                    <input type="email" id="confirmarEmail" value={confirmarEmail} onChange={(event)=> setConfirmarEmail(event.target.value)} placeholder="seu@email.com" required />
                    <br />

                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" value={senha} onChange={(event)=> setSenha(event.target.value)} placeholder="Sua senha" required />
                    <br />

                    <label htmlFor="confirmarSenha">Confirmar senha</label>
                    <input type="password" id="confirmarSenha" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} placeholder="Confirme a sua senha" required />
                    <br />

                    <button type="submit">Cadastrar</button>
                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
        </div>
    )
}

export default Cadastro