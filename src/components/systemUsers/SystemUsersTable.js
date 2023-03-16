import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import SystemUserRow from "./SystemUserRow";
import Swal from "sweetalert2";

//redux
import { connect } from "react-redux";
import {deleteManager} from "../../stores/managers/actions";
function SystemUsersTable ({ managers, deleteManager, onSelectManager }) {
  const onUpdate = (user) => {
    onSelectManager(user)
  }
  const onDelete = async(id) => {
    Swal.fire({
      title: 'Do you want to delete this system user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      icon: "warning"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await deleteManager(id)
      }
    })
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers.map((manager, n) => (
            <SystemUserRow
              num={n + 1}
              manager={manager}
              onUpdate={onUpdate}
              onDelete={onDelete}
              key={manager._id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  deleteManager
};
export default connect(mapStateToProps, mapDispatchToProps)(SystemUsersTable);