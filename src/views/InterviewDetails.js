import { Button, Stack, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInterviews } from "../commons/sample-data";
import AddNewCandidateDialog from "../components/interviews/AddNewCandidateModal";
import AddQuestionsToInterviewDialog from "../components/interviews/AddQuestionDialog/AddQuestionsToInterviewDialog";
import CandidatesTable from "../components/interviews/CandidatesTable";
import InterviewQuestionsTable from "../components/interviews/InterviewQuestionsTable";
import StatCount from "../components/interviews/StatCount";
import NewInterviewDialog from "../components/interviews/NewInterviewDialog"
import Swal from "sweetalert2";

import { APP_URL } from "../config";
//redux
import { connect } from "react-redux";
import { fetchInterviewDetails, generateLink, editInterview } from "../stores/interviews/actions";

//helpers
import { showAlert } from "../helpers/";
const reducerFactory = (criteria) => {
  return function (a, b) {
    return (
      a + (b.status === criteria ? 1 : 0)
    )
  }
}

function InterviewDetails(props) {
  const { interviewId } = useParams()
  const navigate = useNavigate()

  const [isFetching, setIsFetching] = useState(false)
  const [interviewData, setInterviewData] = useState({})
  const [counts, setCounts] = useState({
    candidates: 0,
    completed: 0,
    remaining: 0,
    cancelled: 0
  })
  const [openNewInterviewDialog, setOpenNewInterviewDialog] = useState(false)
  const [openAddQuestionsDialog, setOpenAddQuestionsDialog] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [onHoldBtnLoading, setOnHoldBtnLoading] = useState(false)
  const [completeBtnLoading, setCompleteBtnLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Put the function to call when clicking Complete Interview button
  const handleChangeInterviewStatus = async(status) => { 
    try{
      Swal.fire({
        title: 'Do you want to change interview status?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        icon: "warning"
      }).then(async(result) => {
        if (result.isConfirmed) {
          if(status === "on_hold"){
            setOnHoldBtnLoading(true)
          }else if(status === "closed"){
            setCompleteBtnLoading(true)
          }
          await props.editInterview(props.interview._id, {
            ...props.interview,
            status,
            questions: props.interview?.questions?.map(question => question._id) || [],
            candidates: props.interview?.candidates?.map(candidate => candidate._id) || []
          })
          showAlert({ title: "Sucess!", message: "Interview Status Changed Successfully!", type: "success" })
          navigate(`/interviews/${status === "on_hold" ? 'on-hold' : status}`)
        }
      })
    }catch(err){
      let message = "Something Went Wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setOnHoldBtnLoading(false)
      setCompleteBtnLoading(false)
    }
  }

  // The method to call when Add New Candidate button is clicked
  const onAddNewCandidateClick = (e) => {
    setOpenNewInterviewDialog(true)
  }
  const onCloseAddNewCandidateDialog = (e) => {
    setOpenNewInterviewDialog(false)
  }

  const onAddNewCandidateSuccess = () => {
    // Executed when a candidate is successfully added (i.e.: refresh the component/page)
  }

  const onAddNewQuestionsClick = () => {
    setOpenAddQuestionsDialog(true)
  }

  const onCloseAddNewQuestions = () => {
    setOpenAddQuestionsDialog(false)
  }
  const handleGeneratePublicLink = async() =>{
    try{
      setBtnLoading(true)
      await props.generateLink(interviewId)
      showAlert({ title: "Success!", message: "Public Link generated successfully!", type: "success" })
    }catch(err){
      let message = "Something Went Wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setBtnLoading(false)
    }
  }

  useEffect(() => {
    props.fetchInterviewDetails(interviewId)
  }, [])

  useEffect(() => {
    if (isFetching) {
      // Replace this assignment with fetching
      const fetchedInterview = getInterviews(interviewId)[0]

      setInterviewData(fetchedInterview)

      const candidates = fetchedInterview.candidates.length
      const completed = fetchedInterview.candidates.reduce(reducerFactory('Completed'), 0)
      const cancelled = fetchedInterview.candidates.reduce(reducerFactory('Cancelled'), 0)
      const remaining = candidates - completed - cancelled

      setCounts({ candidates, completed, cancelled, remaining })
    }
  }, [isFetching])

  useEffect(() => {
    // console.log(interviewData)
  }, [interviewData])

  useEffect(()=>{
    if(Array.isArray(props.interview?.candidates)){
      const completedCount = props.interview?.candidates?.filter(candidate => candidate.status === "completed")?.length || 0;
      const pendingCount = props.interview?.candidates?.filter(candidate => candidate.status === "invited")?.length || 0;
      const cancelledCount = props.interview?.candidates?.filter(candidate => candidate.status === "cancelled")?.length || 0;
      console.log(pendingCount)
      setCounts({
        candidates: props.interview?.candidates?.length,
        completed: completedCount,
        remaining: pendingCount,
        cancelled: cancelledCount
      })
    }
  }, [props.interview])
  return (
    <>
      <AddNewCandidateDialog
        open={openNewInterviewDialog}
        onClose={onCloseAddNewCandidateDialog}
        onSuccess={onAddNewCandidateSuccess}
      />
      <AddQuestionsToInterviewDialog
        open={openAddQuestionsDialog}
        onClose={onCloseAddNewQuestions}
        selectedQuestions={props.interview?.questions?.map((question) => question._id) || []}
      />
      <Stack spacing={2}>
        <div style={{ textAlign: 'right' }}>
          {props.interview?.status !== "closed" && (
          <Button 
            variant="contained" 
            onClick={()=>handleChangeInterviewStatus("closed")}
            disabled={completeBtnLoading}
          >
            Complete Interview
          </Button>
          )}
        </div>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="h5"
              component="h1"
            >{props.interview?.title}</Typography>
            <Typography
              sx={{
                fontSize: '0.75em',
                fontWeight: 'bolder',
                color: 'rgba(0, 0, 0, 0.5)',
                textTransform: 'uppercase'
              }}
            >{props.interview?.location}</Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{
                mt: 1,
                fontSize: '0.8em',
                color: 'rgba(0, 0, 0, 0.5)'
              }}
            >{props.interview?.description}</Typography>
            <Button
              variant="outlined"
              onClick={()=>setEditModalOpen(true)}
              color={"primary"}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Edit Interview
            </Button>
            <Button
              variant="outlined"
              onClick={()=>handleChangeInterviewStatus(props.interview?.status === "open" ? "on_hold" : "open")}
              color={props.interview?.status === "open" ? "warning" : "success"}
              style={{ marginTop: 10 }}
              disabled={onHoldBtnLoading}
            >
              {props.interview?.status === "open" ? "On Hold Interview" : "Reopen Interview"}
            </Button>
            <br />
            {props.interview?.interviewToken ? (
              <div style={{ marginTop: 10 }}>
                Public Link:
                <a
                  href={`${APP_URL}interview/invite/${props.interview?.interviewToken}`}
                  target={"_blank"}
                >
                  <Typography
                    variant="h2"
                    component="p"
                    sx={{
                      mt: 1,
                      fontSize: '1em',
                      color: '#1976d2'
                    }}
                  >
                    {`${APP_URL}interview/invite/${props.interview?.interviewToken}`}
                  </Typography>
                </a>
              </div>
            ) : (
              <Button
                variant="outlined"
                onClick={handleGeneratePublicLink}
                color="primary"
                style={{ marginTop: 10 }}
                disabled={btnLoading}
              >
                Generate Public Link
              </Button>
            )}
          </CardContent>
        </Card>
        <Stack spacing={2} direction={{
          xs: 'column', md: 'row'
        }}>
          <StatCount
            count={props.interview?.candidates?.length}
            title="Candidates"
          />
          <StatCount
            title="Completed"
            count={counts.completed}
          />
          <StatCount
            title="Remaining"
            count={counts.remaining}
          />
          <StatCount
            title="Cancelled"
            count={counts.cancelled}
          />
        </Stack>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Typography variant="h5">Candidates</Typography>
              <Button variant="contained" onClick={onAddNewCandidateClick}>Add New Candidate</Button>
            </Box>
          </CardContent>
          <CandidatesTable candidates={props.interview?.candidates || []} />
        </Card>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Typography variant="h5">Questions</Typography>
              <Button
                variant="contained"
                onClick={onAddNewQuestionsClick}
                onClose={onCloseAddNewQuestions}
              >
                Add New Questions
              </Button>
            </Box>
          </CardContent>
          <InterviewQuestionsTable
            questions={props.interview?.questions || []}
          />
        </Card>
      </Stack>
      <NewInterviewDialog 
        open={editModalOpen} 
        onClose={()=>setEditModalOpen(false)} 
        interview={props.interview}
      />
    </>
  )
}
const mapStateToProps = (state) => ({
  interview: state.interviews.interview,
});
const mapDispatchToProps = {
  fetchInterviewDetails,
  generateLink,
  editInterview
};
export default connect(mapStateToProps, mapDispatchToProps)(InterviewDetails);