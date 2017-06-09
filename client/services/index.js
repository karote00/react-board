const TIMEOUT = 1000;

const api = {
	getToggleEditItem(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), TIMEOUT)
		});
	},
	getColumns() {
		return new Promise((resolve, reject) => {
			fetch('../mock/column.json', {method: 'get'})
				.then(res => resolve(res))
				.catch(err => reject(err));
		})
	}
};

export default api;