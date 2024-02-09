import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	useReactTable,
	flexRender,
	createColumnHelper,
	getCoreRowModel,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import "../css/list.css";

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("firstName", {
		cell: (info) => info.getValue(),
		header: () => "First Name",
	}),
	columnHelper.accessor("lastName", {
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => "Last Name",
	}),
	columnHelper.accessor("startDate", {
		header: () => "Start Date",
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("department", {
		header: () => <span>Department</span>,
	}),
	columnHelper.accessor("dateOfBirth", {
		header: "Date of Birth",
	}),
	columnHelper.accessor("street", {
		header: "Street",
	}),
	columnHelper.accessor("city", {
		header: "City",
	}),
	columnHelper.accessor("state", {
		header: "State",
	}),
	columnHelper.accessor("zipCode", {
		header: "Zip Code",
	}),
];
const List = ({ data }) => {
	console.log(data);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [columnOrder, setColumnOrder] = useState([]);
	let table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
			columnOrder,
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	return (
		<div>
			<div id="employee-div" className="container">
				<div className="homepage-link">
					<Link to={"/"}>
						<FontAwesomeIcon
							icon={faHome}
							size="xl"
							style={{ paddingTop: "2px" }}
							color="green"
						/>
					</Link>
				</div>

				<h1>Current Employees</h1>
				{data.length > 0 && (
					<div>
						<table className="list-table">
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext()
													  )}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{data.length === 0 && (
					<p>There is no employee yet. Let create new one! </p>
				)}
			</div>
		</div>
	);
};

export default List;
