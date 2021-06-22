import React, { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps): JSX.Element {
	return <button className="button" {...props}></button>
}
