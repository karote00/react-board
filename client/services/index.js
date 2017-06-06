const TIMEOUT = 1000;

const api = {
	getToggleEditItem(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), TIMEOUT)
		});
	}
};

export default api;