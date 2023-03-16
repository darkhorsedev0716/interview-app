import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import AddSystemUserDialog from "../components/systemUsers/AddSystemUserDialog"
import SystemUsersTable from "../components/systemUsers/SystemUsersTable"

//redux
import { connect } from "react-redux";
import {fetchManagers} from "../stores/managers/actions";

function SystemUsers (props) {
  const [managers, setManagers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedManager, setSelectedManager] = useState({})

  const onAddManagerModalClose = e => {
    setIsModalOpen(false)
  }

  const onAddManagerModalClick = e => {
    e.preventDefault()
    setIsModalOpen(true)
  }
  useEffect(()=>{
    props.fetchManagers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    setManagers(props.managers)
  }, [props.managers])
  useEffect(()=>{
    if(!isModalOpen){
      setSelectedManager({})
    }
  }, [isModalOpen])
  return (
    <>
      <AddSystemUserDialog 
        open={isModalOpen} 
        onClose={onAddManagerModalClose} 
        category={selectedManager}
      />
      <Box sx={{
        width: '100%',
        textAlign: 'right',
        mb: {
          xs: 1,
          md: 2
        }
      }}>
        <Button
          variant="contained"
          size="large"
          onClick={onAddManagerModalClick}
        >Add New System User</Button>
      </Box>
      <SystemUsersTable 
        managers={managers} 
        onSelectManager={(item)=>{
          setSelectedManager(item)
          setIsModalOpen(true)
        }}
      />
    </>
  )
}
const mapStateToProps = (state) => ({
  managers: state.managers.managers,
});
const mapDispatchToProps = {
  fetchManagers
};
export default connect(mapStateToProps, mapDispatchToProps)(SystemUsers);