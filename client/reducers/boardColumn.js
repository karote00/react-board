import { combineReducers } from 'redux';
import {
	TOGGLE_EDIT_ITEM,
	GET_COLUMNS,
	ADD_COLUMN,
	columnsAction
} from '../actions/boardColumn';
import Rx from 'rxjs';

let initState = {
	columnEdit: {},
	columns: {
		items: []
	},
	status: 'NORMAL'
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
	// if (Object.keys(action).length == 0 || !action.payload) return state;

	switch(action.type) {
		case GET_COLUMNS.REQUEST:
			return {
				...state,
				status: 'PENDING'
			};
		case GET_COLUMNS.SUCCESS:
			let columnsIDs = action.payload.columns.map(c => c.id);
			let oldIDs = state.items.map(s => s.id);
			let newColumns = [];
			columnsIDs.forEach((c, idx) => {
				if (oldIDs.indexOf(c) == -1)
					newColumns.push(action.payload.columns[idx]);
			});

			return {
				...state,
				items: [
					...state.items,
					...newColumns
				],
				status: 'NORMAL'
			};
		case GET_COLUMNS.FAILED:
			return {
				...state,
				status: 'FAILED'
			};
		case ADD_COLUMN.REQUEST:
			return {
				...state,
				status: 'PENDING'
			};
		case ADD_COLUMN.SUCCESS:
			return {
				...state,
				status: 'NORMAL'
			};
		case ADD_COLUMN.FAILED:
			return {
				...state,
				status: 'FAILED'
			};
		default:
			return state;
	}
}

const cc = (state, action) => {
	switch(action.type) {
		case ADD_COLUMN.REQUEST:
			return {
				...state,
				status: 'PENDING'
			};
		case ADD_COLUMN.SUCCESS:
			return {
				...state,
				status: 'NORMAL'
			};
		case ADD_COLUMN.FAILED:
			return {
				...state,
				status: 'FAILED'
			};
	}
}

export default combineReducers({
  columnEdit,
  columns,
});