import { Box, Grid, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import InterviewAnswerCard from "../components/interviews/InterviewAnswerCard"
import InterviewShareModal from "../components/interviews/InterviewShareModal"
import { useParams, useNavigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { fetchCandidateDetails, submitReview } from "../stores/candidates/actions";

//helpers
import { showAlert, playOnePauseOtherVideos } from "../helpers/";

function InterviewReview(props) {
  const navigate = useNavigate();
  const [candidateInterviewData, setCandidateInterviewData] = useState({})
  const { interviewId, cInterviewId } = useParams();
  const [btnLoading, setBtnLoading] = useState(false)
  const [isShareModalOpen, setShareModalOpen] = useState(false)

  const onGiveRating = async (ratingGiven, index) => {
    candidateInterviewData.answers[index].rating = ratingGiven
    setCandidateInterviewData({ ...candidateInterviewData })
  }
  const onGiveReview = async (review, index) => {
    candidateInterviewData.answers[index].comments = review
    setCandidateInterviewData({ ...candidateInterviewData })
  }
  const onSubmit = async () => {
    try {
      setBtnLoading(true)
      await props.submitReview(cInterviewId, {
        interviewId,
        answers: candidateInterviewData.answers.map(answer => {
          return {
            ...answer,
            questionId: answer.questionId._id,
          }
        })
      })
      showAlert({ title: "Success!", message: "Interview Review Updated", type: "success" })
      navigate(-1)
    } catch (err) {
      let message = "Something went wrong!";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    } finally {
      setBtnLoading(false)
    }
  }
  useEffect(() => {
    if (props.candidate?._id) {
      setCandidateInterviewData(props.candidate)
    }
  }, [props.candidate])
  useEffect(() => {
    props.fetchCandidateDetails(cInterviewId)
  }, [])
  useEffect(()=>{
    if(candidateInterviewData.answers?.length){
      playOnePauseOtherVideos()
    }
  }, [candidateInterviewData])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span>Candidate Name</span>
          <Typography variant="h4">{candidateInterviewData?.name}</Typography>
        </div>
        <div>
          {candidateInterviewData?.resumeLink && (
            <a href={candidateInterviewData?.resumeLink} download>
              <Button
                variant="contained"
                color="warning"
                sx={{ marginRight: 2 }}
              >
                Download Resume
              </Button>
            </a>
          )}
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={onSubmit}
            disabled={btnLoading}
          >
            Save
          </Button>
          <Button variant="contained" onClick={() => setShareModalOpen(true)}>
            Share
          </Button>
        </div>
      </Box>
      {Array.isArray(candidateInterviewData?.answers) && (
        <Grid container spacing={2}>
          {candidateInterviewData?.answers.map((answer, i) => (
            <Grid item xs={12} md={6} key={i}>
              <InterviewAnswerCard
                answer={answer}
                onGiveRating={onGiveRating}
                onGiveReview={onGiveReview}
                index={i}
                hideReviews={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <InterviewShareModal
        open={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        interviewId={interviewId}
        candidateId={cInterviewId}
      />
    </Box>
  )
}
const mapStateToProps = (state) => ({
  candidate: state.candidates.candidate,
});
const mapDispatchToProps = {
  fetchCandidateDetails,
  submitReview
};
export default connect(mapStateToProps, mapDispatchToProps)(InterviewReview);