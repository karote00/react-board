import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
// import BoardColumn from '../components/BoardColumn';
import VisibleBoardColumn from '../containers/VisibleBoardColumn';
import styleMain from '../style/main.scss';
import styleBoard from '../style/components/board.scss';

class Board extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="board-container">
					<div className="board-content">
						<VisibleBoardColumn />
					</div>
				</div>
		)
	}
}

export default Board;
