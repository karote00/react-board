import { TOGGLE_EDIT_ITEM } from '../actions/boardColumn';

let initState = 'NONE';

function columnEdit(state = initState, action) {
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

export default columnEdit;