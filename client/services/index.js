const TIMEOUT = 1000;

const api = {
	getToggleEditItem(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), TIMEOUT);
		});
	},
	getColumns() {
		const self = this;
		return new Promise((resolve, reject) => {
			let columns = this.getStorage('columns');

			if (!columns || Object.keys(columns).length == 0) {
				fetch('./client/mock/columns.json', {method: 'get'})
					.then(res => {
						return res.json();
					})
					.then(r => {
						self.setStorage('columns', JSON.stringify(r));
						return resolve(r)
					})
					.catch(err => reject(err));
			} else {
				resolve(columns);
			}
		})
	},
	addColumn(column) {
		return new Promise((resolve, reject) => {
			let columns = this.getStorage('columns');
			columns.push(column);
			this.setStorage('columns', JSON.stringify(columns));
			setTimeout(() => resolve(column), TIMEOUT);
		})
	},
	getStorage(key) {
		let items = sessionStorage.getItem(key);
		return items && JSON.parse(items) || null;
	},
	setStorage(key, value) {
		sessionStorage.setItem(key, value);
	}
};

export default api;