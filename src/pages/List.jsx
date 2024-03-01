import React, { useMemo, useState, lazy } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	useReactTable,
	flexRender,
	createColumnHelper,
	getPaginationRowModel,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "../css/list.css";

const Pagination = lazy(() => import("../components/pagination.jsx"));
const NumberIndicator = lazy(() =>
	import("../components/number-item-indicator.jsx")
);
const columnHelper = createColumnHelper();

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

const List = () => {
	const employees = useSelector((state) => state.employee);
	const data = useMemo(() => employees, [employees]);

	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = React.useState([]);

	const columns = useMemo(
		() => [
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
		],
		[]
	);

	let table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			sorting,
		},
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		globalFilterFn: fuzzyFilter,
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
						<div className="table-container">
							<div className="table-controller">
								<NumberIndicator
									pageSize={
										table.getState().pagination.pageSize
									}
									onPageSizeChange={(e) => {
										table.setPageSize(
											Number(e.target.value)
										);
									}}
								/>
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
							<div className="table-wrapper">
								<table className="list-table">
									<thead>
										{table
											.getHeaderGroups()
											.map((headerGroup) => (
												<tr key={headerGroup.id}>
													{headerGroup.headers.map(
														(header) => (
															<th
																key={header.id}
																colSpan={
																	header.colSpan
																}
															>
																{header.isPlaceholder ? null : (
																	<div
																		{...{
																			className:
																				header.column.getCanSort()
																					? "sort-column"
																					: "",
																			onClick:
																				header.column.getToggleSortingHandler(),
																		}}
																	>
																		{flexRender(
																			header
																				.column
																				.columnDef
																				.header,
																			header.getContext()
																		)}
																		{{
																			asc: " 🔼",
																			desc: " 🔽",
																		}[
																			header.column.getIsSorted()
																		] ??
																			null}
																	</div>
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
																	.columnDef
																	.cell,
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
					</div>
				)}

				{data.length === 0 && (
					<p>There is no employee yet. Let create new one! </p>
				)}
			</div>

			{data.length > 0 && (
				<Pagination
					firstPage={() => table.setPageIndex(0)}
					prevPage={() => table.previousPage()}
					canPrevPage={!table.getCanPreviousPage()}
					lastPage={() =>
						table.setPageIndex(table.getPageCount() - 1)
					}
					nextPage={() => table.nextPage()}
					canNextPage={!table.getCanNextPage()}
					currentPage={table.getState().pagination.pageIndex + 1}
					totalPage={table.getPageCount()}
				/>
			)}
		</div>
	);
};

export default List;
