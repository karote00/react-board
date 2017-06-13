import Rx from 'rxjs';
import { getColumns, addColumn } from '../actions/boardColumn';

const TIMEOUT = 1000;

const api = {
	getToggleEditItem(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), TIMEOUT);
		});
	},
	getColumns(dispatch) {
		const self = this;
		let columns = this.getStorage('columns');

		if (!columns || Object.keys(columns).length == 0) {
			const result = Rx.Observable.fromPromise(fetch('./client/mock/columns.json'));
			dispatch(getColumns('REQUEST'))
			result.subscribe({
				next: (res) => res.json()
								.then(data => {
									self.setStorage('columns', JSON.stringify(data));
									dispatch(getColumns('SUCCESS', data))
								}),
				error: (err) => dispatch(getColumns('FAILED')),
				completed: () => {}
			})
		} else {
			dispatch(getColumns('SUCCESS', columns))
		}
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