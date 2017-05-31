import React, { Component } from 'react';

class Column extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="column">{this.props.name}</div>
		)
	}
}

export default Column;