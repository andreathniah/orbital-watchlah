import React from "react";
import base from "../base";
import PollItem from "./PollItem";
import MovieCard from "./MovieCard";
import PollHeader from "./PollHeader";

class PollMain extends React.Component {
	state = {
		display: false,
		displaybox: [],
		roombox: [],
		memberbox: []
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
		this.setState(prevState => ({ roombox: roombox }));

		const data = { status: status };
		memberbox[index] = data;
		this.setState(prevState => ({ memberbox: memberbox }));
	};

	toggleDetails = data => {
		const { displaybox } = this.state;
		if (displaybox.length !== 0 && data.imdbID !== displaybox.imdbID) {
			this.setState(prevState => ({
				displaybox: data
			}));
		} else {
			this.setState(prevState => ({
				display: !prevState.display,
				displaybox: data
			}));
		}
	};

	render() {
		const { roombox } = this.state;
		const { user, match } = this.props;
		const items = Object.keys(roombox).map(id => {
			return (
				<PollItem
					key={id}
					index={id}
					user={user}
					roomId={match.params.roomId}
					details={roombox[id]}
					toggleDetails={this.toggleDetails}
					upvoteMovie={this.upvoteMovie}
				/>
			);
		});

		return (
			<div>
				<PollHeader roomId={match.params.roomId} />
				<div>{items}</div>
				<div>
					{this.state.display ? (
						<MovieCard details={this.state.displaybox} />
					) : null}
				</div>
			</div>
		);
	}
}

export default PollMain;
