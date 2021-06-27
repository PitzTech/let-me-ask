import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./components/Room"

import { AuthContextProvider } from "./context/Auth"

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/rooms/new" component={NewRoom} />
					<Route path="/rooms/:id" component={Room} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App
