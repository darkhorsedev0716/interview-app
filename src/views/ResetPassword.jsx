import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/candidate-interview/Header";

//redux
import { connect } from "react-redux";
import { resetPassword } from "../stores/auth/actions";

//helpers
import { showAlert } from "../helpers";
function ResetPassword(props) {
	const navigate = useNavigate()
	const { token } = useParams();
	const [credentials, setCredentials] = useState({
		password: '',
		confPassword: ''
	})
	const [btnLoading, setBtnLoading] = useState(false)

	const onSubmit = async (e) => {
		try {
			setBtnLoading(true)
			e.preventDefault()
			await props.resetPassword(token, credentials)
			showAlert({ title: "Success!", message: "Password Changed Successfully!", type: "success" })
			navigate("/dashboard")
		} catch (err) {
			let message = "Invalid Email/Password";
			if (err?.response?.data?.message) {
				message = err?.response?.data?.message
			}
			showAlert({ title: "Error!", message, type: "danger" })
		} finally {
			setBtnLoading(false)
		}
	}

	const onInputCredentials = (fieldName, value) => {
		setCredentials({
			...credentials,
			[fieldName]: value
		})
	}

	return (
		<div>
			<Header title="Update Your Password"/>
			<div className="container">
				<form onSubmit={onSubmit} style={{ width: "50%" }}>
					<Box sx={{ padding: '16px' }}>
						<TextField onInput={e => { onInputCredentials("password", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" type="password" label="New Password" value={credentials.password} />
						<TextField onInput={e => { onInputCredentials("confPassword", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" type="password" label="Confirm Password" value={credentials.confPassword} />
						<Button
							color="primary"
							variant="contained"
							type="submit"
							disabled={btnLoading}
							style={{ marginTop: 10 }}
						>
							Submit
						</Button>
					</Box>
				</form>
			</div>
		</div>
	)
}
const mapStateToProps = (state) => ({
	token: state.auth.token,
});
const mapDispatchToProps = {
	resetPassword
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);