import { Paper, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Typography, Tooltip, IconButton, Switch } from "@mui/material"
import { Link } from "react-router-dom"
import { Delete, Edit } from "@mui/icons-material"
import moment from "moment"
import Swal from "sweetalert2"
//redux
import { connect } from "react-redux";
import { editUser } from "../../stores/users/actions";
function UsersTable(props) {
	const { users = [] } = props
	const onUpdateUser = async (id, checked) => {
		Swal.fire({
			title: 'Are you sure want to change the user status?',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			icon: "warning"
		}).then(async (result) => {
			if (result.isConfirmed) {
				await props.editUser(id, { verified: checked })
			}
		})
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ width: '100%' }}>
				<TableHead>
					<TableRow>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Name</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Email</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Username</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Email Verified</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Action</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(user => {
						return (
							<TableRow key={user._id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.activated ? "Yes" : "No"}</TableCell>
								<TableCell>
									<Tooltip title="Update">
										<span>
											<Switch
												checked={user.verified}
												onChange={(e) => onUpdateUser(user._id, e.target.checked)}
											/>
										</span>
									</Tooltip>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
	editUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);