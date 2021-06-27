import React from "react"

import copyImg from "../assets/images/copy.svg"

import "../styles/room-code.scss"

type RoomCodeProps = {
	code: string
}

export function RoomCode(props: RoomCodeProps): JSX.Element {
	function copyRoomCodeToClipboard(): void {
		navigator.clipboard.writeText(props.code)
	}

	return (
		<button onClick={copyRoomCodeToClipboard} className="room-code">
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala {props.code}</span>
		</button>
	)
}
