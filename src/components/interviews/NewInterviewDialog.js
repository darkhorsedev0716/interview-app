import { Grid, Autocomplete, Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import moment from "moment";
//redux
import { connect } from "react-redux";
import {createInterview, editInterview} from "../../stores/interviews/actions";
import {fetchManagers} from "../../stores/managers/actions";

//helpers
import { showAlert } from "../../helpers/";
const SAMPLE_USERS = []
function NewInterviewDialog(props) {
  const {
    open,
    onClose = () => {},
  } = props

  const [interviewData, setInterviewData] = useState({
    title: "",
    jobId: '',
    location: '',
    member: '',
    completionDate: null,
    description: `Dear {{first_name}} ,

    Thank you for your interest for the position: {{interview_name}} . I am pleased to share that your resume has been shortlisted for initial interview.
    
    To initiate the process, I would like to invite you for a video interview. We are using out platform to carryout these interviews. It is a platform that makes it convenient for candidates to record their interviews from anywhere at their own convenience.
    
    Below is the interview link. I would highly recommend it to click this link and familiarize yourself for the process. However, please keep in mind that actual interview should only be started once you are ready. There is no second attempt. You have until {{deadline}} to record your actual interview.
    
    [Start Interview] 
    
    If you have any questions you can contact me directly at my email admin@hiiree.com. For any technical assistance during the interview, please contact support team at admin@hiiree.com.
    
    Thank You`
  })
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(false)

  // Call the API endpoint here.
  const onSubmit = async (e) => {
    try{
      e.preventDefault()
      setLoading(true)
      if(props.interview?._id){
        await props.editInterview(props.interview._id, {
          title: interviewData.title,
          jobId: interviewData.jobId,
          location: interviewData.location,
          member: interviewData.member.id,
          completionDate: interviewData.completionDate,
          description: interviewData.description,
          status: props.interview.status,
          questions: props.interview?.questions?.map(question => question._id) || [],
          candidates: props.interview?.candidates?.map(candidate => candidate._id) || []
        })
      }else{
        await props.createInterview({
          ...interviewData,
          member: typeof interviewData.member === "object" ? interviewData.member.id : null
        })
      }
      showAlert({ title: "Success!", message: `Interview ${props.interview?._id ? "updated" : "created"} successfully!`, type: "success" })
      onClose()
    }catch(err){
      let message = "Something went wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setLoading(false)
    }
  }

  const onChangeInterviewData = (field, value) => {
    setInterviewData({
      ...interviewData,
      [field]: value
    })
  }

  useEffect(()=>{
    if(props.interview?._id){
      let memberTemp = ''
      if(props.interview.member){
        memberTemp = {label: props.interview.member?.name, id: props.interview.member?._id}
      }
      setInterviewData({
        title: props.interview.title,
        jobId: props.interview.jobId,
        location: props.interview.location,
        member: memberTemp,
        completionDate: moment(props.interview.completionDate).format("yyyy-MM-DD"),
        description: props.interview.description
      })
    }
  }, [props.interview])
  useEffect(()=>{
    props.fetchManagers()
  }, [])
  useEffect(()=>{
    const tempManagers = [];
    props.managers.map((manager)=>{
      tempManagers.push({label: manager.name, id: manager._id})
    })
    setManagers(tempManagers)
  }, [props.managers])
  return (
    <Dialog
      open={open}
      xs={{
        width: '700px'
      }}
      onClose={onClose}
    >
      <DialogTitle>Create New Interview</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={1} sx={{marginTop: 1}}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth onInput={(e) => { onChangeInterviewData('title', e.target.value) }} label="Title" placeholder="Title" value={interviewData.title}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth onInput={(e) => { onChangeInterviewData('jobId', e.target.value) }} label="Job ID" placeholder="Job ID" value={interviewData.jobId}/>
              {/* <Autocomplete
                onChange={(e, v) => { onChangeInterviewData('jobId', v) }}
                label="Job ID"
                options={SAMPLE_JOB_IDS}
                renderInput={params => <TextField fullWidth {...params} label="Job ID"/>}
              /> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth onInput={(e) => { onChangeInterviewData('location', e.target.value) }} label="Location" value={interviewData.location}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                onChange={(e, v) => { onChangeInterviewData('member', v) }}
                label="Add Coworker/User"
                options={managers}
                renderInput={params => <TextField fullWidth {...params} label="Add Coworker/User" />}
                value={interviewData.member}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                xs={{ width: '100%' }}
                InputLabelProps={{ shrink: true }}
                onInput={e => { onChangeInterviewData('completionDate', e.target.value) }}
                type="date"
                label="Target Date"
                value={interviewData.completionDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={10}
                onInput={e => { onChangeInterviewData('description', e.target.value) }}
                value={interviewData.description}
                label="Personal message for candidates"
              />
            </Grid>
            <Grid item xs={12}>
              <p style={{fontSize: 12, lineHeight: 1.5, color: "#222"}}>Note: {`Use {{first_name}}, {{interview_name}}, {{deadline}}, {{location}} variables in the description to configure the email body. Use interview button text inside third bracket. ex: [Start Interview]`}</p>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 2,
              textAlign: 'right'
            }}
          >
            <Button onClick={onClose}>Cancel</Button>
            <Button 
              onClick={onSubmit} 
              variant="contained" 
              disabled={loading}
            >
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({
  managers: state.managers.managers
});
const mapDispatchToProps = {
  createInterview,
  editInterview,
  fetchManagers
};
export default connect(mapStateToProps, mapDispatchToProps)(NewInterviewDialog);