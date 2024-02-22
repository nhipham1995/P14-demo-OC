import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "modal-component-oc";

import "../css/home.css";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeForm from "../components/employee-create-form";

const Home = ({ dataHandler }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onCloseHandler = () => {
		setIsModalOpen(false);
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
				<EmployeeForm
					dataHandler={dataHandler}
					submit={() => setIsModalOpen(true)}
				/>
				{/* <form
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
				</form> */}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={onCloseHandler}
				isCloseBtn={true}
				textColor="darkblue"
			>
				<div>
					<h3>Employee Created!</h3>
					<p>
						You can go to
						<Link to={"/list"} className="link-text">
							{" "}
							here{" "}
						</Link>
						to review list of employee list
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default Home;
