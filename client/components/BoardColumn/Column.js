import React, { Component } from 'react';

class Column extends Component {
	constructor(props) {
		super(props);

		this.state = {
			header: this.props.name
		}

		this.handleHeaderEdit = this.handleHeaderEdit.bind(this);
		this.handleHeaderChange = this.handleHeaderChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		const edit = nextProps.editItem;
		if (edit && edit != 'NONE') {
			((self) => {setTimeout(function() {
					self.refs[edit].select();
				}, 10);
			})(this);
		}
	}

	handleHeaderEdit() {
		this.props.onInputEditClick('HEADER');
	}

	handleHeaderChange() {
		this.setState(() => {
			return {header: this.refs.HEADER.value};
		})
	}

	handleBlur() {
		this.props.onInputEditClick('NONE');

		this.props.handleColumnsChange({
			target: this.props.name,
			type: "name",
			value: this.refs.HEADER.value
		});
	}

	render() {
		return (
			<div className="column">
				<div className="column-header">
					<textarea ref="HEADER" className={this.props.editItem == 'HEADER'? 'is-editing': ''} type="text" value={this.state.header} onClick={this.handleHeaderEdit} onChange={this.handleHeaderChange} onBlur={this.handleBlur} />
				</div>
			</div>
		)
	}
}

export default Column;