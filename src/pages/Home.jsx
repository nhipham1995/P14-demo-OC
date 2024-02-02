import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import { Modal } from "modal-component-oc";

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	console.log(isModalOpen);
	const onCloseHandler = () => {
		setIsModalOpen(false);
	};

	const options = states.map((c) => c.name + " - " + c.abbreviation);

	const saveEmployee = (e) => {
		e.preventDefault();
		const data = e.target;
		const employees = JSON.parse(localStorage.getItem("employees")) || [];
		const employee = {
			firstName: data.firstName.value,
			lastName: data.lastName.value,
			dateOfBirth: data.dateOfBirth.value,
			startDate: data.startDate.value,
			department: data.department.value,
			street: data.street.value,
			city: data.city.value,
			state: data.state.value,
			zipCode: data.zipCode.value,
		};
		employees.push(employee);
		localStorage.setItem("employees", JSON.stringify(employees));
		setIsModalOpen(true);
	};

	return (
		<div>
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<Link to={"/list"}>View Current Employees</Link>

				<h2>Create Employee</h2>
				<form action="#" id="create-employee" onSubmit={saveEmployee}>
					<label htmlFor="first-name">First Name</label>
					<input type="text" id="first-name" name="firstName" />
					<label htmlFor="last-name">Last Name</label>
					<input type="text" id="last-name" name="lastName" />
					<label htmlFor="date-of-birth">Date of Birth</label>
					<input id="date-of-birth" type="date" name="dateOfBirth" />
					<label htmlFor="start-date">Start Date</label>
					<input id="start-date" type="text" name="startDate" />

					<fieldset className="address">
						<legend>Address</legend>

						<label htmlFor="street">Street</label>
						<input id="street" type="text" name="streer" />

						<label htmlFor="city">City</label>
						<input id="city" type="text" name="city" />

						<label htmlFor="state">State</label>
						<select name="state" id="state" option={options}>
							{options.map((option, ind) => (
								<option key={ind}>{option}</option>
							))}
						</select>

						<label htmlFor="zip-code">Zip Code</label>
						<input id="zip-code" type="number" name="zipCode" />
					</fieldset>

					<label htmlFor="department">Department</label>
					<select name="department" id="department">
						<option>Sales</option>
						<option>Marketing</option>
						<option>Engineering</option>
						<option>Human Resources</option>
						<option>Legal</option>
					</select>
					<div>
						<button type="submit">Save</button>
					</div>
				</form>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={onCloseHandler}
				isCloseBtn={true}
				// closeText={"Close"}
				backgroundColor={"yellow"}
				textColor={"blue"}
			>
				<p>Employee Created!</p>
				<p onClick={onCloseHandler} className="close-text">
					Close
				</p>
			</Modal>
			{/* <button onClick={() => setIsModalOpen(!isModalOpen)}>
				Open modal
			</button> */}
		</div>
	);
};

export default Home;

const states = [
	{
		name: "Alabama",
		abbreviation: "AL",
	},
	{
		name: "Alaska",
		abbreviation: "AK",
	},
	{
		name: "American Samoa",
		abbreviation: "AS",
	},
	{
		name: "Arizona",
		abbreviation: "AZ",
	},
	{
		name: "Arkansas",
		abbreviation: "AR",
	},
	{
		name: "California",
		abbreviation: "CA",
	},
	{
		name: "Colorado",
		abbreviation: "CO",
	},
	{
		name: "Connecticut",
		abbreviation: "CT",
	},
	{
		name: "Delaware",
		abbreviation: "DE",
	},
	{
		name: "District Of Columbia",
		abbreviation: "DC",
	},
	{
		name: "Federated States Of Micronesia",
		abbreviation: "FM",
	},
	{
		name: "Florida",
		abbreviation: "FL",
	},
	{
		name: "Georgia",
		abbreviation: "GA",
	},
	{
		name: "Guam",
		abbreviation: "GU",
	},
	{
		name: "Hawaii",
		abbreviation: "HI",
	},
	{
		name: "Idaho",
		abbreviation: "ID",
	},
	{
		name: "Illinois",
		abbreviation: "IL",
	},
	{
		name: "Indiana",
		abbreviation: "IN",
	},
	{
		name: "Iowa",
		abbreviation: "IA",
	},
	{
		name: "Kansas",
		abbreviation: "KS",
	},
	{
		name: "Kentucky",
		abbreviation: "KY",
	},
	{
		name: "Louisiana",
		abbreviation: "LA",
	},
	{
		name: "Maine",
		abbreviation: "ME",
	},
	{
		name: "Marshall Islands",
		abbreviation: "MH",
	},
	{
		name: "Maryland",
		abbreviation: "MD",
	},
	{
		name: "Massachusetts",
		abbreviation: "MA",
	},
	{
		name: "Michigan",
		abbreviation: "MI",
	},
	{
		name: "Minnesota",
		abbreviation: "MN",
	},
	{
		name: "Mississippi",
		abbreviation: "MS",
	},
	{
		name: "Missouri",
		abbreviation: "MO",
	},
	{
		name: "Montana",
		abbreviation: "MT",
	},
	{
		name: "Nebraska",
		abbreviation: "NE",
	},
	{
		name: "Nevada",
		abbreviation: "NV",
	},
	{
		name: "New Hampshire",
		abbreviation: "NH",
	},
	{
		name: "New Jersey",
		abbreviation: "NJ",
	},
	{
		name: "New Mexico",
		abbreviation: "NM",
	},
	{
		name: "New York",
		abbreviation: "NY",
	},
	{
		name: "North Carolina",
		abbreviation: "NC",
	},
	{
		name: "North Dakota",
		abbreviation: "ND",
	},
	{
		name: "Northern Mariana Islands",
		abbreviation: "MP",
	},
	{
		name: "Ohio",
		abbreviation: "OH",
	},
	{
		name: "Oklahoma",
		abbreviation: "OK",
	},
	{
		name: "Oregon",
		abbreviation: "OR",
	},
	{
		name: "Palau",
		abbreviation: "PW",
	},
	{
		name: "Pennsylvania",
		abbreviation: "PA",
	},
	{
		name: "Puerto Rico",
		abbreviation: "PR",
	},
	{
		name: "Rhode Island",
		abbreviation: "RI",
	},
	{
		name: "South Carolina",
		abbreviation: "SC",
	},
	{
		name: "South Dakota",
		abbreviation: "SD",
	},
	{
		name: "Tennessee",
		abbreviation: "TN",
	},
	{
		name: "Texas",
		abbreviation: "TX",
	},
	{
		name: "Utah",
		abbreviation: "UT",
	},
	{
		name: "Vermont",
		abbreviation: "VT",
	},
	{
		name: "Virgin Islands",
		abbreviation: "VI",
	},
	{
		name: "Virginia",
		abbreviation: "VA",
	},
	{
		name: "Washington",
		abbreviation: "WA",
	},
	{
		name: "West Virginia",
		abbreviation: "WV",
	},
	{
		name: "Wisconsin",
		abbreviation: "WI",
	},
	{
		name: "Wyoming",
		abbreviation: "WY",
	},
];
