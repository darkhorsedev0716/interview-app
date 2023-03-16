import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button
} from "@mui/material"
import { useState } from "react"

//redux
import { connect } from "react-redux";
import {createCandidate} from "../../stores/candidates/actions";

//helpers
import { showAlert } from "../../helpers/";
function AddNewCandidateDialog (props) {
  const {
    open,
    onClose = () => {},
    onSuccess = () => {}
  } = props

  const [candidateData, setCandidateData] = useState({
    name: '',
    deadline: null,
    email: '',
    phone: '',
    additionalDetails: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)

  const onInputCandidateData = (field, value) => {
    setCandidateData({
      ...candidateData,
      [field]: value
    })
  }

  const onSubmit = async(e) => {
    try{
      e.preventDefault()
      setBtnLoading(true)
      await props.createCandidate({
        ...candidateData,
        interviewId: props.interview._id
      })
      showAlert({ title: "Success!", message: "New candidate created successfully", type: "success" })
      onClose()
    }catch(err){
      let message = "Something went wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setBtnLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add new candidate
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="Name"
                onInput={e => { onInputCandidateData('name', e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="Deadline Date"
                onInput={e => { onInputCandidateData('deadline', e.target.value) }}
                InputLabelProps={{ shrink: true }}
                type="date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="Email"
                onInput={e => { onInputCandidateData('email', e.target.value) }}
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ width: '100%' }}
                label="Phone No."
                onInput={e => { onInputCandidateData('phone', e.target.value) }}
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%' }}
                label="Details"
                placeholder="Add additional details (i.e. LinkedIn profile)"
                multiline
                rows={3}
                onInput={e => { onInputCandidateData('additionalDetails', e.target.value) }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            variant="contained" 
            type="submit"
            disabled={btnLoading}
          > 
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({
  interview: state.interviews.interview
});
const mapDispatchToProps = {
  createCandidate
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewCandidateDialog);