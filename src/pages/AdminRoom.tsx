import React from "react"
import { useHistory, useParams } from "react-router-dom"

import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

import logoImg from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"

import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question"

import "../styles/room.scss"

type RoomParams = {
	id: string
}

export function AdminRoom(): JSX.Element {
	const history = useHistory()
	const params = useParams<RoomParams>()
	const roomId = params.id
	const { title, questions } = useRoom(roomId)

	async function handleEndRoom(): Promise<void> {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date()
		})

		history.push("/")
	}

	async function handleDeleteQuestion(questionId: string): Promise<void> {
		const isConfirmed = window.confirm(
			"Tem certeza que você deseja excluir esta pergunta?"
		)
		if (isConfirmed)
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
	}

	async function handleCheckQuestionAsAnswered(questionId: string): Promise<void> {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true
		})
	}

	async function handleHighlighQuestion(questionId: string): Promise<void> {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: true
		})
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Let me ask logo" />
					<div>
						<RoomCode code={roomId} />
						<Button onClick={handleEndRoom} isOutlined>
							Encerrar Sala
						</Button>
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
							isAnswered={question.isAnswered}
							isHighlighted={question.isHighlighted}
						>
							{!question.isAnswered && (
								<>
									<button
										type="button"
										onClick={() => handleCheckQuestionAsAnswered(question.id)}
									>
										<img src={checkImg} alt="Marcar pergunta como respondida" />
									</button>
									<button
										type="button"
										onClick={() => handleHighlighQuestion(question.id)}
									>
										<img src={answerImg} alt="Dar destaque à pergunta" />
									</button>
								</>
							)}
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt="Remover pergunta" />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	)
}
