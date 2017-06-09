export const TOGGLE_EDIT_ITEM = "TOGGLE_EDIT_ITEM";

export const GET_COLUMNS = {
	REQUEST: 'GET_COLUMNS_REQUEST',
	SUCCESS: 'GET_COLUMNS_SUCCESS',
	FAILED: 'GET_COLUMNS_FAILED'
}

/** regular action */
export const toggleEditItem = (item) => {
	return {
		type: TOGGLE_EDIT_ITEM,
		payload: {
			item
		}
	}
}

export const getColumns = (status, columns) => {
	return {
		type: GET_COLUMNS[status],
		payload: {
			columns
		}
	}
}


/** action for saga status */
// export const toggleEditItem =  {
// 	request: (item) => ({ type: TOGGLE_EDIT_ITEM.REQUEST, payload: { item } }),
// 	success: (payload) => ({ type: TOGGLE_EDIT_ITEM.SUCCESS, payload }),
// 	failed: (err) => ({ type: TOGGLE_EDIT_ITEM.FAILED, err })
// }