import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";

//yup scheme
const formInputScheme = yup.object().shape({
	email: yup.string().required("Email is required."),
	password: yup
		.string()
		.matches(/^[^\s~^_]*$/, "Symbols '~', '_' and space are not allowed.")
		.min(6, "Password should be longer than 6 symbols")
		.max(12, "Password should not be longer than 12 symbols"),
	matchPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Password does not match."),
});

function App() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			matchPassword: "",
		},
		resolver: yupResolver(formInputScheme),
	});

	let errorMessage = null;
	const toGetError = (errors) => {
		if (errors.email) {
			errorMessage = errors.email?.message;
		} else if (errors.password) {
			errorMessage = errors.password?.message;
		} else if (errors.matchPassword) {
			errorMessage = errors.matchPassword?.message;
		}
		return errorMessage;
	};
	const onSubmit = (date) => {
		console.log(date);
		reset();
	};

	return (
		<div className={styles.App}>
			<h1>Login</h1>
			<form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
				<span className={styles.ErrorText}>{toGetError(errors)}</span>

				<input
					type="email"
					name="email"
					placeholder="e-mail"
					autoFocus
					{...register("email")}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					{...register("password")}
				/>
				<input
					type="password"
					name="matchPassword"
					placeholder="Confirm password"
					{...register("matchPassword")}
				/>

				<div className={styles.ButtonsContainer}>
					<button type="submit"> Submit </button>
				</div>
			</form>
		</div>
	);
}

export default App;

//{errors.matchPassword && (<span className={styles.ErrorText}>{errors.matchPassword.message}</span>)}
