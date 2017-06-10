import { connect } from 'react-redux';
import { default as columnEdit } from '../reducers/boardColumn';
import { toggleEditItem } from '../actions/boardColumn';
import Column from '../components/BoardColumn/Column';
import api from '../services';

const mapStateToProps = (state, action) => {
	return {
		editItem: state.columnEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInputEditClick: (id, item) => dispatch(toggleEditItem(id, item))
	}
}

const VisibleColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);

export default VisibleColumn;