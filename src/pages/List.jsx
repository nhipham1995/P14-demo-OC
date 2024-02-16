import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	useReactTable,
	flexRender,
	createColumnHelper,
	getPaginationRowModel,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getSortedRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
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

const fuzzyFilter = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

const List = ({ data }) => {
	const [globalFilter, setGlobalFilter] = useState("");
	let table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
		},

		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getCoreRowModel: getCoreRowModel(),
		globalFilterFn: fuzzyFilter,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});
	console.log(table._getSortedRowModel);
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
						<div className="table-container">
							<div>
								<input
									value={globalFilter ?? ""}
									onChange={(e) => {
										setGlobalFilter(e.target.value);
									}}
									className="result-list"
									placeholder="Search all columns..."
								/>
							</div>
							<p className="list-info-text">
								There is{" "}
								{table.getPrePaginationRowModel().rows.length >
								0
									? table.getPrePaginationRowModel().rows
											.length > 1
										? table.getPrePaginationRowModel().rows
												.length + " results."
										: table.getPrePaginationRowModel().rows
												.length + " result."
									: "no result."}
							</p>
							<table className="list-table">
								<thead>
									{table
										.getHeaderGroups()
										.map((headerGroup) => (
											<tr key={headerGroup.id}>
												{headerGroup.headers.map(
													(header) => (
														<th key={header.id}>
															{header.isPlaceholder
																? null
																: flexRender(
																		header
																			.column
																			.columnDef
																			.header,
																		header.getContext()
																  )}
														</th>
													)
												)}
											</tr>
										))}
								</thead>
								<tbody>
									{table.getRowModel().rows.map((row) => (
										<tr key={row.id}>
											{row
												.getVisibleCells()
												.map((cell) => (
													<td key={cell.id}>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext()
														)}
													</td>
												))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{data.length === 0 && (
					<p>There is no employee yet. Let create new one! </p>
				)}
			</div>
			<div className="flex items-center gap-2">
				<button
					className="pagination"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					className="pagination"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					className="pagination"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					className="pagination"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<div className="page-info">
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</div>
				<div className="item-number-per-page">
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[3, 5, 6, 8, 10, 12, 20, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize} items per page
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default List;
