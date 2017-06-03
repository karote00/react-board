import { take, put, call, fork, race, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { TOGGLE_INPUT_EDIT, toggleInputEdit } from '../actions/boardColumn';

export function* watchBoardColumnInputEdit() {
	try {
		while (true) {
			const { payload } = yield take(toggleInputEdit.request, TOGGLE_INPUT_EDIT.REQUEST);
			yield put(toggleInputEdit.success(payload));
		}
	} catch(error) {
		yield call(toggleInputEdit.failed)
	}
}

function* rootSaga() {
	yield fork(watchBoardColumnInputEdit)
}

export default rootSaga;