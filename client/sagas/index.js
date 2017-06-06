import { take, put, call, fork, race, cancelled, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { TOGGLE_EDIT_ITEM, toggleEditItem } from '../actions/boardColumn';

export function* watchBoardColumnEdit() {
	// try {
	// 	while (true) {
	// 		const { payload } = yield take(TOGGLE_EDIT_ITEM.REQUEST, toggleEditItem.request);
	// 		yield put(toggleEditItem.success(payload));
	// 	}
	// } catch(error) {
	// 	yield put(toggleEditItem.failed(error))
	// }
}

function* rootSaga() {
	yield fork(watchBoardColumnEdit)
}

export default rootSaga;