import React from "react";
import base from "../../base";
import PollItem from "./PollItem";
import PollHeader from "./PollHeader";
import MovieCard from "../movies/MovieCard";

class PollMain extends React.Component {
	state = {
		display: false,
		displaybox: [],
		roombox: [],
		memberbox: [], // stores individual users' vote preference
		userbox: [] // stores all users' vote preference
	};

	componentDidMount() {
		const { match, user } = this.props;
		const { roomId } = match.params;
		this.ref = base.syncState(`roombox/${roomId}`, {
			context: this,
			state: "roombox"
		});

		this.ref = base.syncState(`memberbox/${roomId}/${user}`, {
			context: this,
			state: "memberbox"
		});

		this.ref = base.syncState(`memberbox/${roomId}`, {
			context: this,
			state: "userbox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	upvoteMovie = (index, status) => {
		const roombox = { ...this.state.roombox };
		const memberbox = { ...this.state.memberbox };

		status
			? (roombox[index].Votes = roombox[index].Votes + 1)
			: (roombox[index].Votes = roombox[index].Votes - 1);

		const data = { status: status };
		memberbox[index] = data;

		this.setState(
			prevState => ({ roombox: roombox, memberbox: memberbox }),
			() => {
				// console.log(this.state.roombox[index].Votes);
				// console.log(this.state.memberbox[index].status);
			}
		);
	};

	toggleDetails = data => {
		const { displaybox } = this.state;
		if (displaybox.length !== 0 && data.imdbID !== displaybox.imdbID) {
			this.setState(prevState => ({ displaybox: data }));
		} else {
			this.setState(prevState => ({
				display: !prevState.display,
				displaybox: data
			}));
		}
	};

	render() {
		const { roombox, memberbox, userbox, displaybox, display } = this.state;

		const { user, match } = this.props;
		const items = Object.keys(roombox).map(id => {
			return (
				<PollItem
					key={id}
					index={id}
					user={user}
					roomId={match.params.roomId}
					details={memberbox[id]}
					toggleDetails={this.toggleDetails}
					upvoteMovie={this.upvoteMovie}
				/>
			);
		});

		return (
			<div className="col-md-10">
				<PollHeader roomId={match.params.roomId} details={userbox} />
				<div>{items}</div>
				<div>{display ? <MovieCard details={displaybox} /> : null}</div>
			</div>
		);
	}
}

export default PollMain;
