export const TOGGLE_INPUT_EDIT = {
	REQUEST: 'TOGGLE_INPUT_EDIT_REQUEST',
	SUCCESS: 'TOGGLE_INPUT_EDIT_SUCCESS',
	FAILED: 'TOGGLE_INPUT_EDIT_FAILED',
};
// export const toggleInputEdit = (item) => {
// 	return {
// 		type: TOGGLE_INPUT_EDIT,
// 		payload: {
// 			item
// 		}
// 	}
// }

export const toggleInputEdit =  {
	request: (item) => ({ type: TOGGLE_INPUT_EDIT.REQUEST, payload: { item } }),
	success: (payload) => ({ type: TOGGLE_INPUT_EDIT.SUCCESS, payload }),
	failed: () => ({ type: TOGGLE_INPUT_EDIT.FAILED })
}