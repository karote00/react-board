// import { createAction, createActions, handleActions } from 'redux-actions';
// import createTypes from 'redux-create-action-types';

// // const EDIT = createTypes('BOARD_COLUMN_EDIT');
// // console.log(EDIT)
// // const boardColumnEdit = createAction({
// // 	header: (type) => ()
// // })

// const BOARD_COLUMN_EDIT_NONE = createTypes('BOARD_COLUMN_EDIT_NONE');
// const BOARD_COLUMN_EDIT_HEADER = createTypes('BOARD_COLUMN_EDIT_HEADER');

// const toggleInputEdit = createAction(BOARD_COLUMN_EDIT_HEADER);

// export {
// 	BOARD_COLUMN_EDIT_NONE,
// 	BOARD_COLUMN_EDIT_HEADER,
// 	toggleInputEdit
// }

export const TOGGLE_INPUT_EDIT = 'TOGGLE_INPUT_EDIT';
export const toggleInputEdit = (item) => {
	return {
		type: TOGGLE_INPUT_EDIT,
		item
	}
}