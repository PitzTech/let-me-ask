import { useContext } from "react"
import { AuthContext } from "../context/Auth"
import { AuthContextType } from "../types/auth"

export function useAuth(): AuthContextType {
	const value = useContext(AuthContext)

	return value
}
