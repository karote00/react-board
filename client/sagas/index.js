import { take, put, call, fork, race, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { TOGGLE_INPUT_EDIT, toggleInputEdit } from '../actions/boardColumn';

export function* watchBoardColumnInputEdit() {
	try {
		// while (true) {
		// 	const edit = yield call(toggleInputEdit, {TOGGLE_INPUT_EDIT});
		// }
	} catch(error) {

	}
}

function* rootSaga() {
	yield fork(watchBoardColumnInputEdit)
}

export default rootSaga;