import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/list" element={<List />}></Route>

					{/* <Route path="/404" element={<PageNotFound />} /> */}
					<Route path="/*" element={<Navigate to="/404" />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
