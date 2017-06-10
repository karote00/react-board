import { combineReducers } from 'redux';
import {
	TOGGLE_EDIT_ITEM,
	GET_COLUMNS
} from '../actions/boardColumn';

let initState = {
	columnEdit: {},
	columns: []
};

function columnEdit(state = initState.columnEdit, action) {
	switch(action.type) {
		case TOGGLE_EDIT_ITEM:
			return {
				...state,
				[action.payload.id]: action.payload.item
			};
		default:
			return state;
	}
}

function columns(state = initState.columns, action) {
	if (Object.keys(action).length == 0 || !action.payload) return state;

	switch(action.type) {
		case GET_COLUMNS.REQUEST:
			return state;
		case GET_COLUMNS.SUCCESS:
			let columnsIDs = action.payload.columns.map(c => c.id);
			let oldIDs = state.map(s => s.id);
			let newColumns = [];
			columnsIDs.forEach((c, idx) => {
				if (oldIDs.indexOf(c) == -1)
					newColumns.push(action.payload.columns[idx]);
			});

			return [
				...state,
				...newColumns
			];
		case GET_COLUMNS.FAILED:
			return state;
		default:
			return state;
	}
}

export default combineReducers({
  columnEdit,
  columns
});