import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";
import RoomPicker from "./RoomPicker";
import MovieDetails from "./movies/MovieDetails";
import Polls from "./poll/Polls";
import Leaderboard from "./leaderboard/Leaderboard";
import Individual from "./poll/Individual";
import NicknamePicker from "./poll/NicknamePicker";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={RoomPicker} />
			<Route path="/:roomId/leaderboard" component={Leaderboard} />
			<Route path="/:roomId/movies" component={MovieDetails} />
			<Route path="/:roomId/polls" component={Polls} />
			<Route path="/:roomId/share" component={NicknamePicker} />
			<Route path="/:roomId/:nickname" component={Individual} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
