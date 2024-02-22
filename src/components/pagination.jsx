import "../css/pagination.css";

const Pagination = ({
	prevPage,
	canPrevPage,
	firstPage,
	canNextPage,
	lastPage,
	nextPage,
	currentPage,
	totalPage,
}) => {
	return (
		<div className="flex items-center gap-2">
			<button
				className="pagination"
				onClick={firstPage}
				disabled={canPrevPage}
			>
				{"<<"}
			</button>
			<button
				className="pagination"
				onClick={prevPage}
				disabled={canPrevPage}
			>
				{"<"}
			</button>
			<button
				className="pagination"
				onClick={nextPage}
				disabled={canNextPage}
			>
				{">"}
			</button>
			<button
				className="pagination"
				onClick={lastPage}
				disabled={canNextPage}
			>
				{">>"}
			</button>
			<div className="page-info">
				<strong>
					{currentPage} of {totalPage}
				</strong>
			</div>
		</div>
	);
};

export default Pagination;
