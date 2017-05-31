import React, { Component } from 'react';
import Column from './Column'

class BoardColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: []
		}

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(tar) {
		if (tar.charCode == 13) {
			const adc = this.refs.adc;
			const value = adc.value;

			if (value) {
				this.setState(() => {
					let columns = this.state.columns.push({name: value});
					return columns;
				});

				adc.value = '';
			}
		}
	}

	render() {
		const columns = this.state.columns.map((c, idx) => {
			return <div key={idx}>{c.name}</div>
		});

		return (
			<div className="column-container">
				<div className="column-content">
					{columns}
				</div>
				<div className="column-empty">
					<div>
						<input ref="adc" type="text" placeholder="Add a list..." onKeyPress={this.handleKeyPress} />
					</div>
				</div>
			</div>
		);
	}
}

export default BoardColumn;