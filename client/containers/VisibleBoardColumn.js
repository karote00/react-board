import { connect } from 'react-redux';
import { default as columns } from '../reducers/boardColumn';
import { getColumns, addColumn } from '../actions/boardColumn';
import BoardColumn from '../components/BoardColumn';
import api from '../services';

const mapStateToProps = (state, action) => {
	return {
		columns: state.columns
	}
}

const mapDispatchToProps = (dispatch) => {
	const maps = {
		getColumns: async (item) => {
			dispatch(getColumns('REQUEST'));

			try {
				const columns = await api.getColumns(item);
				dispatch(getColumns('SUCCESS', columns));
			} catch(err) {
				dispatch(getColumns('FAILED'));
			}
		},
		addColumn: async (item) => {
			dispatch(addColumn('REQUEST'));

			try {
				const column = await api.addColumn(item);
				dispatch(addColumn('SUCCESS', column));
			} catch(err) {
				dispatch(addColumn('FAILED'));
			} finally {
				maps.getColumns();
			}
		}
	}

	return maps;
}

const VisibleBoardColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardColumn);

export default VisibleBoardColumn;