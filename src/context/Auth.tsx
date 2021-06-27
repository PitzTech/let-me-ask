import React, { createContext, useEffect, useState } from "react"
import { firebase, auth } from "../services/firebase"

import { User, AuthContextType, AuthContextProviderProps } from "../types/auth"

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps): JSX.Element {
	const [user, setUser] = useState<User>()

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, photoURL, uid } = user

				if (!displayName || !photoURL)
					throw new Error("Missing information from Google Account")

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				})
			}
		})

		return () => {
			unsubscribe()
		}
	}, [])

	async function signInWithGoogle(): Promise<void> {
		const provider = new firebase.auth.GoogleAuthProvider()

		const result = await auth.signInWithPopup(provider)

		// auth.signInWithPopup(provider).then(result => {
		if (result.user) {
			const { displayName, photoURL, uid } = result.user

			if (!displayName || !photoURL)
				throw new Error("Missing information from Google Account")

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			})
		}
		// })
	}

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	)
}
