import React, { Component } from 'react';

class Column extends Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: 'NONE',
			header: this.props.name
		}

		this.handleHeaderEdit = this.handleHeaderEdit.bind(this);
		this.handleHeaderChange = this.handleHeaderChange.bind(this);
		this.handleHeaderBlur = this.handleHeaderBlur.bind(this);
	}

	componentDidMount() {

	}

	handleHeaderEdit() {
		this.setState(() => {
			return {edit: 'HEADER'};
		});

		((self) => {setTimeout(function() {
				self.refs.ch.focus();
			}, 10);
		})(this);
	}

	handleHeaderChange() {
		this.setState(() => {
			return {header: this.refs.ch.value};
		})
	}

	handleHeaderBlur() {
		this.setState(() => {
			return {edit: 'NONE'};
		});

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
					{this.state.edit == 'HEADER'?
						<input ref="ch" type="text" value={this.state.header} onChange={this.handleHeaderChange} onBlur={this.handleHeaderBlur} />
						:
						<div>{this.state.header}</div>
					}
				</div>
			</div>
		)
	}
}

export default Column;