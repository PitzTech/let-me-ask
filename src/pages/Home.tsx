import React from "react"
import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function Home(): JSX.Element {
	const history = useHistory()
	const { user, signInWithGoogle } = useAuth()

	async function handleCreateRoom(): Promise<void> {
		if (!user) await signInWithGoogle()

		history.push("/rooms/new")
	}

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas."
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Let me ask logo" />
					<button onClick={handleCreateRoom} className="create-room">
						<img src={googleIconImg} alt="Logo do Google" />
						Crie sua sala com o google
					</button>
					<div className="separator">ou entre em uma sala</div>
					<form>
						<input type="text" placeholder="Digite o código da sala" />
						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
