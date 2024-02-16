import { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import "./App.css";

const App = () => {
	const employees = JSON.parse(localStorage.getItem("employees"));

	const [data, setData] = useState(employees ?? []);

	const dataHandler = (newData) => {
		setData([...data, newData]);
	};
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								// data={data}
								dataHandler={(e) => dataHandler(e)}
							/>
						}
					></Route>
					<Route path="/list" element={<List data={data} />}></Route>

					{/* <Route path="/404" element={<PageNotFound />} /> */}
					<Route path="/*" element={<Navigate to="/404" />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
