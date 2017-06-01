import {
	TOGGLE_INPUT_EDIT,
	toggleInputEdit
} from '../actions/boardColumn';

let initState = 'NONE'

function boardColumnEdit(state = initState, action) {
	console.log(action)
	switch(action.type) {
		case TOGGLE_INPUT_EDIT:
			return action.item;
		default:
			return state;
	}
}

export default boardColumnEdit;