import { connect } from 'react-redux';
import columnEdit from '../reducers/boardColumn';
import { toggleEditItem } from '../actions/boardColumn';
import Column from '../components/BoardColumn/Column';

const mapStateToProps = (state, action) => {
	return {
		editItem: columnEdit(state, action)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInputEditClick: (item) => {
			dispatch(toggleEditItem.request(item))
		}
	}
}

const VisibleColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);

export default VisibleColumn;