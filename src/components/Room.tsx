import React, { useState, ChangeEvent } from "react"
import { useParams } from "react-router"

import logoImg from "../assets/images/logo.svg"

import { Button } from "./Button"
import { RoomCode } from "./RoomCode"

import "../styles/room.scss"
import { useAuth } from "../hooks/useAuth"

type RoomParams = {
	id: string
}

export function Room(): JSX.Element {
	const { user } = useAuth()
	const params = useParams<RoomParams>()
	const roomId = params.id
	const [newQuestion, setNewQuestion] = useState("")

	async function handleSendQuestion(
		event: ChangeEvent<HTMLTextAreaElement>
	): Promise<void> {
		if (newQuestion.trim() === "") return

		if (!user) throw new Error("You must be logged in")

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar
			},
			isHighlighted: false,
			isAnswered: false
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Let me ask logo" />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala React</h1>
					<span>4 Perguntas</span>
				</div>

				<form>
					<textarea
						onChange={handleSendQuestion}
						value={newQuestion}
						placeholder="Dígite sua pergunta"
					/>

					<div className="form-footer">
						<span>
							Para enviar uma pergunta, <button>faça seu login</button>
						</span>
						<Button type="submit">Enviar Pergunta</Button>
					</div>
				</form>
			</main>
		</div>
	)
}
