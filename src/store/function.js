//convert object to string and store in localStorage
export const saveToLocalStorage = (state) => {
	try {
		const oldData = localStorage.getItem("employees");
		localStorage.setItem("employees", [...oldData, JSON.stringify(state)]);
	} catch (e) {
		console.warn(e);
	}
};

// convert data from localStorage (string into Object)
export const loadFromLocalStorage = () => {
	try {
		const fetchedState = localStorage.getItem("employees");
		if (fetchedState === null) return [];
		return JSON.parse(fetchedState);
	} catch (e) {
		console.warn(e);
		return [];
	}
};
