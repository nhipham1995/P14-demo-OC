import { useState } from "react";
import Input from "../components/common/input";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { analysedStates } from "../datas/states";
import { departmentArray } from "../datas/departments";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store";

import "../css/employee-create-form.css";

const EmployeeForm = ({ submit }) => {
	const dispatch = useDispatch();

	const [birthDate, setBirthDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [department, setDepartment] = useState(departmentArray[0]?.value);
	const [state, setState] = useState(analysedStates[0]?.value);

	const saveEmployee = (e) => {
		e.preventDefault();
		const formData = e.target;
		const employees = JSON.parse(localStorage.getItem("employees")) || [];

		const employee = {
			firstName: formData.firstName.value,
			lastName: formData.lastName.value,
			dateOfBirth: formData.dateOfBirth.value,
			startDate: formData.startDate.value,
			department: formData.department.value,
			street: formData.street.value,
			city: formData.city.value,
			state: formData.state.value,
			zipCode: formData.zipCode.value,
		};

		submit();
		dispatch(addEmployee(employee));
		// employees.push(employee);
		// localStorage.setItem("employees", JSON.stringify(employees));
		e.target.reset();
	};

	return (
		<form
			action="#"
			id="create-employee"
			className="employee-form"
			onSubmit={saveEmployee}
		>
			<div className="name-zone">
				<Input
					name={"firstName"}
					id={"first-name"}
					label={"First Name"}
					type={"text"}
					isRequired={true}
				/>
				<Input
					name={"lastName"}
					id={"last-name"}
					label={"Last Name"}
					type={"text"}
					isRequired={true}
				/>
			</div>
			<div className="date-zone">
				<div>
					<label htmlFor="date-of-birth">Date of Birth</label>
					<DatePicker
						selected={birthDate}
						onChange={(date) => setBirthDate(date)}
						name="dateOfBirth"
						id="date-of-birth"
						required
					/>
				</div>
				<div>
					<label htmlFor="start-date">Start Date</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						name="startDate"
						id="start-date"
					/>
				</div>
			</div>

			<fieldset className="address">
				<legend>Address</legend>
				<Input
					name={"street"}
					id={"street"}
					label={"Street"}
					type={"text"}
					isRequired={true}
				/>
				<div className="location-zone">
					<Input
						name={"city"}
						id={"city"}
						label={"City"}
						type={"text"}
						isRequired={true}
					/>
					<Input
						name={"zipCode"}
						id={"zip-code"}
						label={"Zip Code"}
						type={"number"}
						isRequired={true}
					/>
				</div>

				{/* <label htmlFor="state">State</label> */}
				<p className="label-like">State</p>
				<Select
					value={state}
					defaultValue={state}
					name="state"
					id="state"
					onChange={(e) => setState(e)}
					options={analysedStates}
					closeMenuOnScroll={true}
					captureMenuScroll
					maxMenuHeight={150}
					menuShouldScrollIntoView
					placeholder={state}
					required
					label="state"
				/>
			</fieldset>

			{/* <label htmlFor="department">Department</label> */}
			<p className="label-like">Department</p>
			<Select
				value={department}
				name="department"
				id="department"
				label="department"
				onChange={(e) => setDepartment(e)}
				options={departmentArray}
				closeMenuOnScroll={true}
				captureMenuScroll
				maxMenuHeight={100}
				menuShouldScrollIntoView
				placeholder={department}
				required
			/>

			<div>
				<button className="submit-form" type="submit">
					Save
				</button>
			</div>
		</form>
	);
};

export default EmployeeForm;
