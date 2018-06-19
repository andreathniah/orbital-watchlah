import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RoomPicker from "./RoomPicker";
import Leaderboard from "./Leaderboard";
import MovieCard from "./MovieCard";
import NotFound from "./NotFound";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={RoomPicker} />
			<Route path="/room/:roomId" component={Leaderboard} />
			{/* <Route path="/room/:roomId/movies" component={MovieCard} /> */}
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
