import React, { Component } from 'react';
// import Column from './Column';
import VisibleColumn from '../../containers/VisibleColumn';
import '../../style/components/column.scss';
import '../../style/components/form.scss';

class BoardColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [{
				id: 0,
				name: 'Features'
			}]
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleColumnsChange = this.handleColumnsChange.bind(this);
		this.handleColumnAdd = this.handleColumnAdd.bind(this);
	}

	componentDidMount() {
		this.props.getColumns();
	}

	componentWillReceiveProps(nextProps) {

	}

	handleKeyPress(tar) {
		if (tar.charCode == 13) this.ColumnAdd(tar);
	}

	handleColumnsChange(obj) {
		let columns = this.state.columns.map((c) => {
			if (obj.target == c.name) {
				c[obj.type] = obj.value;
			}

			return c;
		});

		this.setState(() => columns);
	}

	handleColumnAdd(tar) {
		this.ColumnAdd(tar);
	}

	ColumnAdd(tar) {
		const adc = this.refs.adc;
		const value = adc.value;

		if (value) {
			this.props.addColumn({
				id: value,
				name: value
			});

			adc.value = '';
		}

		tar.preventDefault(true);
		tar.stopPropagation(true);
	}

	render() {
		const columns = this.props.columns.items.map((c, idx) => {
			return <VisibleColumn key={c.name} {...c} handleColumnsChange={this.handleColumnsChange} />;
		});

		return (
			<div className="column-container">
				<div className="column-content" style={{width: 280 * (columns.length + 1) + 10 + 'px'}}>
					{columns}
					<div className="column">
						<form onSubmit={this.handleColumnAdd}>
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