import React, { Component } from 'react';

class Column extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: 'none'
			// edit: 'header'
		}

		this.handleHeaderEdit = this.handleHeaderEdit.bind(this);
		this.handleHeaderChange = this.handleHeaderChange.bind(this);
	}

	componentDidMount() {

	}

	handleHeaderEdit() {
		this.setState(() => {
			return {edit: 'header'};
		})
	}

	handleHeaderChange() {
		this.props.handleColumnsChange({
			target: this.props.name,
			type: "name",
			value: this.refs.ch.value
		});
	}

	render() {
		return (
			<div className="column">
				<div className="column-header" onClick={this.handleHeaderEdit}>
					{this.state.edit == 'header'?
						<input ref="ch" type="text" value={this.props.name} onChange={this.handleHeaderChange} />
						:
						<div>{this.props.name}</div>
					}
				</div>
			</div>
		)
	}
}

export default Column;