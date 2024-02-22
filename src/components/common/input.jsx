const Input = ({ label, name, id, isRequired, type }) => {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type={type} id={id} name={name} required={isRequired} />
		</div>
	);
};
export default Input;
