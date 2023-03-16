import { Container } from "@mui/material"
import UsersTable from "../../components/admin/UsersTable"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router";

//redux
import { connect } from "react-redux";
import {fetchUsers} from "../../stores/users/actions";

function Users (props) {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsers(props.users)
  }, [props.users])

  useEffect(() => {
    props.fetchUsers()
  }, [])
  useEffect(()=>{
    if(props.profile?.role !== "admin"){
      navigate("/dashboard")
    }
  }, [props.profile])
  return (
    <Container>
      <UsersTable users={users} />
    </Container>
  )
}
const mapStateToProps = (state) => ({
  users: state.users.users,
  profile: state.profile.profile
});
const mapDispatchToProps = {
  fetchUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);