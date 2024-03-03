import "../css/number-item-indicator.css";

const NumberIndicator = ({ pageSize, onPageSizeChange }) => {
	return (
		<div className="flex items-center gap-2">
			<div className="number-per-page">
				<select
					value={pageSize}
					onChange={(e) => onPageSizeChange(e)}
					name="number item per page select"
				>
					{[2, 3, 5, 6, 8, 10, 12, 20, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize} items per page
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default NumberIndicator;
