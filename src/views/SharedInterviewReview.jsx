import { Box, Grid, Typography, Button, TextField, Card, CardContent, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import InterviewAnswerCard from "../components/interviews/InterviewAnswerCard"
import { useParams, useNavigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { fetchSharedInterviewDetails, editSharedInterview } from "../stores/sharedInterviews/actions";

//helpers
import { playOnePauseOtherVideos } from "../helpers";

function SharedInterviewReview(props) {
	const navigate = useNavigate();
	const [candidateInterviewData, setCandidateInterviewData] = useState({})
	const { id, password } = useParams();
	const [btnLoading, setBtnLoading] = useState(false)
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState("")

	useEffect(() => {
		if (props.sharedInterview?._id) {
			setCandidateInterviewData(props.sharedInterview?.candidateId)
			setRating(props.sharedInterview.rating)
			setReview(props.sharedInterview.comments)
		}
	}, [props.sharedInterview])
	useEffect(()=>{
		props.fetchSharedInterviewDetails(id, {
			password
		})
	}, [])
	useEffect(()=>{
		if(candidateInterviewData.answers?.length){
			playOnePauseOtherVideos()
		}
	}, [candidateInterviewData])
	return (
		<div>
			<div className="container">
					<Box sx={{ width: '100%' }}>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<Typography variant="h4">{props.sharedInterview?.name}</Typography>
								<span>Email: {props.sharedInterview?.email}</span> <br />
								<span>Phone: {props.sharedInterview?.phone}</span>
							</div>
						</Box>
						{Array.isArray(candidateInterviewData?.answers) && (
							<Grid container spacing={2}>
								{candidateInterviewData?.answers.map((answer, i) => (
									<Grid item xs={12} md={6} key={i}>
										<InterviewAnswerCard
											answer={answer}
											onGiveRating={() => { }}
											onGiveReview={() => { }}
											index={i}
											hideReviews={true}
										/>
									</Grid>
								))}
							</Grid>
						)}
						<Card>
							<CardContent>
								<div>Rating</div>
								<Rating
									value={props.sharedInterview?.rating || 0}
								/>
								<TextField
									sx={{ width: '100%', marginTop: 2 }}
									label="Review"
									InputLabelProps={{ shrink: true }}
									type="text"
									value={props.sharedInterview.comments}
									multiline={true}
									rows={5}
								/>
							</CardContent>
						</Card>
					</Box>
			</div>
		</div>
	)
}
const mapStateToProps = (state) => ({
	sharedInterview: state.sharedInterviews.sharedInterview,
});
const mapDispatchToProps = {
	fetchSharedInterviewDetails,
	editSharedInterview
};
export default connect(mapStateToProps, mapDispatchToProps)(SharedInterviewReview);