import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RoomPicker from "./RoomPicker";
import MovieDetails from "./MovieDetails";
import Polls from "./Polls";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound";
import Individual from "./Individual";
import NicknamePicker from "./NicknamePicker";

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
