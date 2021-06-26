import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

import { AuthContextProvider } from "./context/Auth"

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Route path="/" exact component={Home} />
				<Route path="/rooms/new" component={NewRoom} />
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App
