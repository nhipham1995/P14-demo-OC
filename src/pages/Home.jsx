import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "modal-component-oc";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { analysedStates } from "../datas/states";
import { departmentArray } from "../datas/departments";

import "../css/home.css";
import "react-datepicker/dist/react-datepicker.css";

const Home = ({ data, dataHandler }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [birthDate, setBirthDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [department, setDepartment] = useState(departmentArray[0]?.value);
	const [state, setState] = useState(analysedStates[0]?.value);

	const onCloseHandler = () => {
		setIsModalOpen(false);
	};

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
		console.log("employee", employee);
		dataHandler(employee);

		employees.push(employee);
		localStorage.setItem("employees", JSON.stringify(employees));
		setIsModalOpen(true);
	};

	return (
		<div>
			<div className="header">
				<div className="title">
					<h1>HRnet</h1>
				</div>
				<div>
					<Link to={"/list"}>Current Employees</Link>
				</div>
			</div>

			<div className="container">
				<h2>Create Employee</h2>
				<form
					action="#"
					id="create-employee"
					className="employee-form"
					onSubmit={saveEmployee}
				>
					<div className="name-zone">
						<div>
							<label htmlFor="first-name">First Name</label>
							<input
								type="text"
								id="first-name"
								name="firstName"
								required
							/>
						</div>
						<div>
							<label htmlFor="last-name">Last Name</label>
							<input
								type="text"
								id="last-name"
								name="lastName"
								required
							/>
						</div>
					</div>
					<div className="date-zone">
						<div>
							<label htmlFor="date-of-birth">Date of Birth</label>
							{/* <input id="date-of-birth" type="date" name="dateOfBirth" /> */}
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
							{/* <input id="start-date" type="text" name="startDate" /> */}
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

						<label htmlFor="street">Street</label>
						<input id="street" type="text" name="street" required />
						<div className="location-zone">
							<div>
								<label htmlFor="city">City</label>
								<input
									id="city"
									type="text"
									name="city"
									required
								/>
							</div>
							<div>
								<label htmlFor="zip-code">Zip Code</label>
								<input
									id="zip-code"
									type="number"
									name="zipCode"
									required
								/>
							</div>
						</div>

						<label htmlFor="state">State</label>
						<Select
							value={state}
							defaultValue={state}
							name="state"
							onChange={(e) => setState(e)}
							options={analysedStates}
							closeMenuOnScroll={true}
							captureMenuScroll
							maxMenuHeight={150}
							menuShouldScrollIntoView
							placeholder={state}
							required
						/>
					</fieldset>

					<label htmlFor="department">Department</label>

					<Select
						value={department}
						name="department"
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
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={onCloseHandler}
				isCloseBtn={true}
			>
				<div>
					<h3>Employee Created!</h3>
					<p>
						You can go to{" "}
						<Link to={"/list"} className="link-text">
							here
						</Link>{" "}
						to review list of employee list
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default Home;
