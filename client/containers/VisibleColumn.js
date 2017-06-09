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
		onInputEditClick: async (item) => {
			dispatch(toggleEditItem(item, 'REQUEST'))

			try {
				const editItem = await api.getToggleEditItem(item);
				dispatch(toggleEditItem(item, 'SUCCESS'))
			} catch(err) {
				dispatch(toggleEditItem(item, 'FAILED'))
			}
		}
	}
}

const VisibleColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);

export default VisibleColumn;