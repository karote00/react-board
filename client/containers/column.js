import { connect } from 'react-redux';
import boardColumnEdit from '../reducers/boardColumn';
import { toggleInputEdit } from '../actions/boardColumn';
import Column from '../components/BoardColumn/Column';

const mapStateToProps = (state, action) => {
	return {
		editItem: boardColumnEdit(state, action)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInputEditClick: (item) => {
			dispatch(toggleInputEdit.request(item))
		}
	}
}

const VisibleColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);

export default VisibleColumn;