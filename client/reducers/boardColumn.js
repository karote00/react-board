import { combineReducers } from 'redux';
import {
	TOGGLE_EDIT_ITEM,
	GET_COLUMNS
} from '../actions/boardColumn';

let initState = {
	columnEdit: 'NONE',
	columns: {}
};

function columnEdit(state = initState.columnEdit, action) {
	switch(action.type) {
		case TOGGLE_EDIT_ITEM.REQUEST:
			return 'NONE';
		case TOGGLE_EDIT_ITEM.SUCCESS:
			return action.payload.item;
		case TOGGLE_EDIT_ITEM.FAILED:
			return 'NONE';
		default:
			return state;
	}
}

function columns(state = initState.columns, action) {
	switch(action.type) {
		case GET_COLUMNS.REQUEST:
			return state;
		case GET_COLUMNS.SUCCESS:
			return state;
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