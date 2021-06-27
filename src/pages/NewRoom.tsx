import React, { FormEvent, ChangeEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"
import { database } from "../services/firebase"

export function NewRoom(): JSX.Element {
	const { user } = useAuth()
	const [newRoom, setNewRoom] = useState("")
	const history = useHistory()

	async function handleCreateRoom(event: FormEvent): Promise<void> {
		event.preventDefault()

		if (newRoom.trim() === "") return

		const roomRef = database.ref("rooms")

		const firerebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id
		})

		history.push(`/rooms/${firerebaseRoom.key}`)
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
		const value = event.target.value

		setNewRoom(value)
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
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={handleInputChange}
							value={newRoom}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	)
}
