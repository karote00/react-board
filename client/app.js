import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './pages/board.js'

ReactDOM.render(
	<Board />,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}