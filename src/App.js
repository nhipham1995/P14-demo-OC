import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import "./App.css";
import { Suspense } from "react";

const App = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/list" element={<List />}></Route>
						<Route path="/*" element={<Navigate to="/404" />} />
					</Routes>
				</Router>
			</div>
		</Suspense>
	);
};

export default App;
