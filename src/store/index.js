import { configureStore, createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from "./function";

const employeeSlice = createSlice({
	name: "employee",
	initialState: loadFromLocalStorage() || [],
	reducers: {
		// add a new employee into store "employee"
		addEmployee(state, action) {
			console.log("state", state);
			console.log("action", action);
			state.push(action.payload);
		},
	},
});

const store = configureStore({
	reducer: {
		employee: employeeSlice.reducer,
	},
});

// listen for store changes + use savaToLocalStorage to save state to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store };
export const { addEmployee } = employeeSlice.actions;
