import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";

//redux
import { connect } from "react-redux";
import { createManager, editManager } from "../../stores/managers/actions";

//helpers
import { showAlert } from "../../helpers";

function AddSystemUserDialog({
  open,
  onClose = () => { },
  createManager = () => { },
  editManager = () => { },
  manager
}) {
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const { name, email, username } = state
      if (manager?._id) {
        await editManager(manager._id, { name, email, username })
      } else {
        let randomPassword = (Math.random() + 1).toString(36).substring(2);
        await createManager({ 
          name, 
          email, 
          username,
          password: randomPassword,
          passwordConfirm: randomPassword
        })
      }
      showAlert({ title: "Success!", message: `Manager ${manager?._id ? "updated" : "created"} successfully!`, type: "success" })
      onClose()
    } catch (err) {
      let message = "Something went wrong!";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    } finally {
      setLoading(false)
    }
  }
  const onInput = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>Add Manager</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <Grid container spacing={2} sx={{ width: '100%', marginBottom: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                onInput={onInput}
                value={state.name}
                label="Name"
                sx={{
                  width: {
                    md: '500px'
                  }
                }}
                name="name"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: '100%', marginBottom: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                onInput={onInput}
                value={state.email}
                label="Email"
                sx={{
                  width: {
                    md: '500px'
                  }
                }}
                name="email"
                type="email"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                onInput={onInput}
                value={state.username}
                label="Username"
                sx={{
                  width: {
                    md: '500px'
                  }
                }}
                name="username"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {manager?._id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  createManager,
  editManager
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSystemUserDialog);