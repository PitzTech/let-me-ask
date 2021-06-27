import React, { useEffect, useState, ChangeEvent, FormEvent } from "react"
import { useParams } from "react-router"

import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

import logoImg from "../assets/images/logo.svg"

import { Button } from "./Button"
import { RoomCode } from "./RoomCode"

import "../styles/room.scss"

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string
			avatar: string
		}
		content: string
		isAnswered: boolean
		isHighlighted: boolean
	}
>

type RoomParams = {
	id: string
}

export function Room(): JSX.Element {
	const { user } = useAuth()
	const params = useParams<RoomParams>()
	const roomId = params.id
	const [newQuestion, setNewQuestion] = useState("")
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`)

		roomRef.once("value", room => {
			const databaseRoom = room.val()
			const firebaseQuestions = databaseRoom.questions as FirebaseQuestions

			const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(
				([key, value]) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered
					}
				}
			)
		})
	}, [roomId])

	function handleQuestionChange(event: ChangeEvent<HTMLTextAreaElement>): void {
		const value = event.target.value
		setNewQuestion(value)
	}

	async function handleSendQuestion(event: FormEvent): Promise<void> {
		event.preventDefault()

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

		await database.ref(`rooms/${roomId}/questions`).push(question)

		setNewQuestion("")
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

				<form onSubmit={handleSendQuestion}>
					<textarea
						onChange={handleQuestionChange}
						value={newQuestion}
						placeholder="Dígite sua pergunta"
					/>

					<div className="form-footer">
						{user ? (
							<div className="user-info">
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta, <button>faça seu login</button>
							</span>
						)}
						<Button type="submit" disabled={!user}>
							Enviar Pergunta
						</Button>
					</div>
				</form>
			</main>
		</div>
	)
}
