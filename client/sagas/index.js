import { take, put, call, fork, race, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { TOGGLE_INPUT_EDIT, toggleInputEdit } from '../actions/boardColumn';

export function* watchBoardColumnInputEdit(item) {
	try {
		console.log(item)
		// while (true) {
			// yield call(toggleInputEdit(item))
		// }
	} finally {

	}
}

function* rootSaga() {
	yield fork(watchBoardColumnInputEdit)
}

export default rootSaga;