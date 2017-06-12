export const TOGGLE_EDIT_ITEM = "TOGGLE_EDIT_ITEM";

export const GET_COLUMNS = {
	REQUEST: 'GET_COLUMNS_REQUEST',
	SUCCESS: 'GET_COLUMNS_SUCCESS',
	FAILED: 'GET_COLUMNS_FAILED'
}

export const ADD_COLUMN = {
	REQUEST: 'ADD_COLUMN_REQUEST',
	SUCCESS: 'ADD_COLUMN_SUCCESS',
	FAILED: 'ADD_COLUMN_FAILED'
}

/** regular action */
export const toggleEditItem = (id, item) => {
	return {
		type: TOGGLE_EDIT_ITEM,
		payload: {
			id,
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

export const addColumn = (status, column) => {
	return {
		type: ADD_COLUMN[status],
		payload: {
			column
		}
	}
}


/** action for saga status */
// export const toggleEditItem =  {
// 	request: (item) => ({ type: TOGGLE_EDIT_ITEM.REQUEST, payload: { item } }),
// 	success: (payload) => ({ type: TOGGLE_EDIT_ITEM.SUCCESS, payload }),
// 	failed: (err) => ({ type: TOGGLE_EDIT_ITEM.FAILED, err })
// }