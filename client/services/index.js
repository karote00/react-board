import Rx from 'rxjs';
import { getColumns, addColumn } from '../actions/boardColumn';

const PRODUCTION = ENV.status === 'production'? true: false;
const TIMEOUT = 1000;
const api = {
	getToggleEditItem(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), TIMEOUT);
		});
	},
	getColumns(observer) {
		let result;
		if (PRODUCTION) {
			result = Rx.Observable.of([
				{
					"id": 1,
					"name": "Features"
				},
				{
					"id": 2,
					"name": "Todo"
				}
			]);
		} else {
			const apiUrl = './client/mock/columns.json';
			result = Rx.Observable.fromPromise(fetch(apiUrl))
								.concatMap((res) => res.json());
		}

		result.subscribe(observer);
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