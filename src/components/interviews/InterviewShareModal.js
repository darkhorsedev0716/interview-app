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
  import {createSharedInterview} from "../../stores/sharedInterviews/actions";
  
  //helpers
  import { showAlert } from "../../helpers/";
  function InterviewShareModal (props) {
    const {
      open,
      onClose = () => {},
    } = props
  
    const [state, setState] = useState({
      name: '',
      deadline: null,
      email: '',
      phone: '',
      password: ''
    })
    const [btnLoading, setBtnLoading] = useState(false)
  
    const onInputData = (field, value) => {
        setState({
        ...state,
        [field]: value
      })
    }
  
    const onSubmit = async(e) => {
      try{
        e.preventDefault()
        setBtnLoading(true)
        await props.createSharedInterview({
          ...state,
          interviewId: props.interviewId,
          candidateId: props.candidateId,
        })
        showAlert({ title: "Success!", message: "Interview shared successfully", type: "success" })
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
          Share Interview
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Name"
                  onInput={e => { onInputData('name', e.target.value) }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Deadline Date"
                  onInput={e => { onInputData('deadline', e.target.value) }}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Email"
                  onInput={e => { onInputData('email', e.target.value) }}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Phone No."
                  onInput={e => { onInputData('phone', e.target.value) }}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Password"
                  onInput={e => { onInputData('password', e.target.value) }}
                  type="password"
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
    createSharedInterview
  };
  export default connect(mapStateToProps, mapDispatchToProps)(InterviewShareModal);