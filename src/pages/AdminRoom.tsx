import React, { useState, ChangeEvent, FormEvent } from "react"
import { useParams } from "react-router"

import { useRoom } from "../hooks/useRoom"

import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question"

import "../styles/room.scss"

type RoomParams = {
	id: string
}

export function AdminRoom(): JSX.Element {
	const { user } = useAuth()
	const params = useParams<RoomParams>()
	const roomId = params.id
	const [newQuestion, setNewQuestion] = useState("")
	const { title, questions } = useRoom(roomId)

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
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined>Encerrar Sala</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
				</div>

				<div className="question-list">
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
						/>
					))}
				</div>
			</main>
		</div>
	)
}
