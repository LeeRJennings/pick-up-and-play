import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"

export const Login = ({ setAuthUser }) => {
	const [loginUser, setLoginUser] = useState({ email: "" });
	const [existDialog, setExistDialog] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const newUser = { ...loginUser };
		newUser[event.target.id] = event.target.value;
		setLoginUser(newUser);
	};

	const existingUserCheck = () => {
		// If your json-server URL is different, please change it below!
		return fetch(`http://localhost:1968/users?email=${loginUser.email}`)
			.then((res) => res.json())
			.then((user) => (user.length ? user[0] : false));
	};

	const handleLogin = (e) => {
		e.preventDefault();

		existingUserCheck().then((exists) => {
			if (exists) {
				// The user id is saved under the key nutshell_user in session Storage. Change below if needed!
				setAuthUser(exists)
				navigate("/");
			} else {
				setExistDialog(true);
			}
		});
	};

	return (
		<main className="container--login">
			<dialog className="dialog dialog--auth" open={existDialog}>
				<div>User does not exist</div>
				<button
					className="button--close"
					onClick={(e) => setExistDialog(false)}
				>
					Close
				</button>
			</dialog>
			<section>
				<form className="form--login" onSubmit={handleLogin}>
					<h1>Pick Up & Play</h1>
					<h2>Please sign in</h2>
					<fieldset>
						<label htmlFor="inputEmail"> Email address </label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Email address"
							required
							autoFocus
							value={loginUser.email}
							onChange={handleInputChange}
						/>
					</fieldset>
					<fieldset>
						<button type="submit">Login</button>
					</fieldset>
					<div className="link--register">
						<Link className="registerLink" to="/register">Register for an account</Link>
					</div>
				</form>
			</section>
		</main>
	);
};
