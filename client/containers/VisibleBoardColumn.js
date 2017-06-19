import { connect } from 'react-redux';
import { default as columns } from '../reducers/boardColumn';
import { getColumns, getColumnsRequest, getColumnsSuccess, getColumnsFailed, addColumn } from '../actions/boardColumn';
import { ccStore$ } from '../reducers/boardColumn';
import BoardColumn from '../components/BoardColumn';
import api from '../services';

const mapStateToProps = (state, action) => {
	return {
		columns: state.columns
	}
}

const mapDispatchToProps = (dispatch) => {
	const maps = {
		getColumns: () => {
			let columns = api.getStorage('columns');
			if (!columns || Object.keys(columns).length == 0) {
				let observer = {
					next: (data) => dispatch(getColumnsSuccess(data)),
					error: (err) => dispatch(getColumnsFailed()),
					completed: () => {}
				}
				api.getColumns(observer);
			} else {
				dispatch(getColumnsSuccess(columns))
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