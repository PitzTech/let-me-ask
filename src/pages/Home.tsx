import React, { ChangeEvent, FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function Home(): JSX.Element {
	const history = useHistory()
	const { user, signInWithGoogle } = useAuth()
	const [roomCode, setRoomCode] = useState("")

	async function handleCreateRoom(): Promise<void> {
		if (!user) await signInWithGoogle()

		history.push("/rooms/new")
	}

	async function handleJoinRoom(event: FormEvent): Promise<void> {
		event.preventDefault()

		if (roomCode.trim() === "") return

		const roomRef = await database.ref(`rooms/${roomCode}`).get()

		if (!roomRef.exists()) {
			alert("Room doesn't exists.")
			return
		}

		history.push(`/rooms/${roomCode}`)
	}

	function handleChangeRoomCode(event: ChangeEvent<HTMLInputElement>): void {
		const value = event.target.value

		setRoomCode(value)
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
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							onChange={handleChangeRoomCode}
							value={roomCode}
						/>
						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
