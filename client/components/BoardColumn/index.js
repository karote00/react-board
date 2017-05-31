import React, { Component } from 'react';
import Column from './Column';
import '../../style/components/column.scss';
import '../../style/components/form.scss';

class BoardColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [{
				name: 'Features'
			}]
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
			return <Column key={idx} {...c} />;
		});

		return (
			<div className="column-container" style={{width: 280 * (columns.length + 1) + 10 + 'px'}}>
				<div className="column-content">
					{columns}
				</div>
				<div className="column-empty">
					<div className="column">
						<form>
							<input className="column-name-add-input" ref="adc" type="text" placeholder="Add a list..." onKeyPress={this.handleKeyPress} />
							<div className="column-add-ctrls">
								<input type="submit" value="Save" className="primary cloumn-add-btn" />
								<a className="icon-close cancle-edit"></a>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default BoardColumn;