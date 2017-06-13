import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './pages/board.js';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Board />
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}