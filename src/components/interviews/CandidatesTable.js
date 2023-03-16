import {
  Button,
  Chip,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch
} from "@mui/material"
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import React, {useState} from "react";
import { useNavigate } from "react-router";
//redux
import { connect } from "react-redux";
import {sendInvitation, editCandidate} from "../../stores/candidates/actions";

//helpers
import { showAlert } from "../../helpers/";
function CandidatesTable (props) {
  const {
    candidates = [],
    onInviteButtonClick = () => {},
    onReviewButtonClick = () => {}
  } = props
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSendEmail = async(candidate) =>{
    try{
      setLoading(true)
      await props.sendInvitation(candidate._id, candidate.interviewId)
      showAlert({ title: "Success!", message: "Invitation Sent Successfully!", type: "success" })
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
  const handleUpdateShortlist = async(candidate, checked) =>{
    await props.editCandidate(candidate._id, {
      ...candidate,
      shortlisted: checked
    })
    showAlert({ title: "Success!", message: checked ? `Candidate Shortlisted!` : 'Candidate removed from shortlisted!', type: "success" })
  }
  const calculateAvgCount = (answers) =>{
    let average = 0
    if(Array.isArray(answers)){
      let sum = answers.reduce((a, b) => +a + +b.rating, 0)
      let totalRated = answers.filter((answer)=>answer.rating > 0)
      let avgRating = sum/totalRated.length
      if(isNaN(avgRating)){
        return 0
      }else{
        return sum/totalRated.length
      }
    }
    return average;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              ContactInfo
            </TableCell>
            <TableCell>
              Invite
            </TableCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell>
              Shortlisted
            </TableCell>
            <TableCell>
              Rating
            </TableCell>
            <TableCell>
              Review
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map(candidate => (
            <TableRow key={candidate._id}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>
                {candidate.phone && <Chip variant="outlined" label={candidate.phone} />}
                {candidate.email && <Chip variant="outlined" label={candidate.email} style={{marginLeft: 10}}/>}
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={()=>handleSendEmail(candidate)}
                  variant="outlined"
                  disabled={candidate.status === "completed" || candidate.status === "cancelled" || loading}
                >
                  {candidate.status === "created" ? "Send" : "Resend"}
                </Button>
              </TableCell>
              <TableCell style={{textTransform: "capitalize"}}>{candidate.status === "created" ? "Not Invited" : candidate.status}</TableCell>
              <TableCell>
                <Switch 
                  checked={candidate.shortlisted} 
                  onChange={(e)=>handleUpdateShortlist(candidate, e.target.checked)} 
                />
              </TableCell>
              <TableCell><Rating precision={0.5} value={calculateAvgCount(candidate.answers)} readOnly /></TableCell>
              <TableCell>
                <IconButton size="small" onClick={e => navigate(`/interviews/${candidate.interviewId}/candidate-interviews/${candidate._id}`)}>
                  <VideoCameraFrontIcon size="small" style={{fill: candidate.answers?.length > 0 ? "#1976d2" : "gray"}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const mapStateToProps = (state) => ({
  interview: state.interviews.interview
});
const mapDispatchToProps = {
  sendInvitation,
  editCandidate
};
export default connect(mapStateToProps, mapDispatchToProps)(CandidatesTable);