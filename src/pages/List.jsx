import { Link } from "react-router-dom";
import { useReactTable } from "@tanstack/react-table";

const List = () => {
	const employees = JSON.parse(localStorage.getItem("employees"));
	console.log(employees);
	const table = useReactTable(employees);
	return (
		<div>
			<div id="employee-div" className="container">
				<h1>Current Employees</h1>
				<table id="employee-table" className="display"></table>
				<Link to={"/"}>Home</Link>
				{table}
			</div>
		</div>
	);
};

export default List;
