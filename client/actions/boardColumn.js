export const TOGGLE_EDIT_ITEM = {
	REQUEST: 'TOGGLE_EDIT_ITEM_REQUEST',
	SUCCESS: 'TOGGLE_EDIT_ITEM_SUCCESS',
	FAILED: 'TOGGLE_EDIT_ITEM_FAILED',
};
// export const toggleInputEdit = (item) => {
// 	return {
// 		type: TOGGLE_EDIT_ITEM,
// 		payload: {
// 			item
// 		}
// 	}
// }

export const toggleEditItem =  {
	request: (item) => ({ type: TOGGLE_EDIT_ITEM.REQUEST, payload: { item } }),
	success: (payload) => ({ type: TOGGLE_EDIT_ITEM.SUCCESS, payload }),
	failed: (err) => ({ type: TOGGLE_EDIT_ITEM.FAILED, err })
}