export const TOGGLE_EDIT_ITEM = {
	REQUEST: 'TOGGLE_EDIT_ITEM_REQUEST',
	SUCCESS: 'TOGGLE_EDIT_ITEM_SUCCESS',
	FAILED: 'TOGGLE_EDIT_ITEM_FAILED',
};

export const GET_COLUMNS = {
	REQUEST: 'GET_COLUMNS_REQUEST',
	SUCCESS: 'GET_COLUMNS_SUCCESS',
	FAILED: 'GET_COLUMNS_FAILED'
}

/** regular action */
export const toggleEditItem = (item, status) => {
	console.log(item, status)
	return {
		type: TOGGLE_EDIT_ITEM[status],
		payload: {
			item
		}
	}
}

export const getColumns = (status) => {
	return {
		type: GET_COLUMNS[status]
	}
}


/** action for saga status */
// export const toggleEditItem =  {
// 	request: (item) => ({ type: TOGGLE_EDIT_ITEM.REQUEST, payload: { item } }),
// 	success: (payload) => ({ type: TOGGLE_EDIT_ITEM.SUCCESS, payload }),
// 	failed: (err) => ({ type: TOGGLE_EDIT_ITEM.FAILED, err })
// }