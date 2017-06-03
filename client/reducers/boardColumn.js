import {
	TOGGLE_INPUT_EDIT,
	toggleInputEdit
} from '../actions/boardColumn';

let initState = 'NONE';

function boardColumnEdit(state = initState, action) {
	switch(action.type) {
		case TOGGLE_INPUT_EDIT.REQUEST:
			return 'NONE';
		case TOGGLE_INPUT_EDIT.SUCCESS:
			return action.payload.item;
		case TOGGLE_INPUT_EDIT.FAILED:
			return 'NONE';
		default:
			return state;
	}
}

export default boardColumnEdit;