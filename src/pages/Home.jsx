import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "modal-component-oc";

import "../css/home.css";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeForm from "../components/employee-create-form";

const Home = () => {
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
				<EmployeeForm submit={() => setIsModalOpen(true)} />
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
