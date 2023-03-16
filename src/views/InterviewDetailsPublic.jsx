import { Box, Grid, Typography, Button, TextField, Card, CardContent, CardActions, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import InterviewAnswerCard from "../components/interviews/InterviewAnswerCard"
import Header from "../components/candidate-interview/Header";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

//redux
import { connect } from "react-redux";
import { fetchSharedInterviewDetails, editSharedInterview, fetchSharedInterviewDetailsPublic } from "../stores/sharedInterviews/actions";

//helpers
import { showAlert, playOnePauseOtherVideos } from "../helpers/";

function InterviewDetailsPublic(props) {
	const navigate = useNavigate();
	const [candidateInterviewData, setCandidateInterviewData] = useState({})
	const { id } = useParams();
	const [btnLoading, setBtnLoading] = useState(false)
	const [showDetails, setShowDetails] = useState(false)
	const [credentials, setCredentials] = useState({
		password: '',
	})
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState("")
	const [checkInfo, setCheckInfo] = useState(false)
	const [checkTerms, setCheckTerms] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showExitButton, setShowExitButton] = useState(false)

	const onSetRating = async (e) => {
		try {
			setBtnLoading(true)
			setLoading(true)
			e.preventDefault()
			await props.editSharedInterview(id, {
				password: props.sharedInterview.password,
				rating,
				comments: review
			})
			showAlert({ title: "Success!", message: "Feedback updated succcessfully!", type: "success" })
			setShowExitButton(true)
		} catch (err) {
			let message = "Something Went Wrong!";
			if (err?.response?.data?.message) {
				message = err?.response?.data?.message
			}
			showAlert({ title: "Error!", message, type: "danger" })
		} finally {
			setBtnLoading(false)
			setLoading(false)
		}
	}
	const onSubmit = async (e) => {
		try {
			setBtnLoading(true)
			e.preventDefault()
			await props.fetchSharedInterviewDetails(id, {
				password: credentials.password
			})
			setShowDetails(true)
		} catch (err) {
			let message = "Something Went Wrong!";
			if (err?.response?.data?.message) {
				message = err?.response?.data?.message
			}
			showAlert({ title: "Error!", message, type: "danger" })
		} finally {
			setBtnLoading(false)
		}
	}

	const onInputCredentials = (fieldName, value) => {
		setCredentials({
			...credentials,
			[fieldName]: value
		})
	}
	useEffect(() => {
		if (props.sharedInterview?._id) {
			setCandidateInterviewData(props.sharedInterview?.candidateId)
			setRating(props.sharedInterview.rating)
			setReview(props.sharedInterview.comments)
		}
	}, [props.sharedInterview])
	useEffect(() => {
		props.fetchSharedInterviewDetailsPublic(id)
	}, [])
	useEffect(()=>{
		if(candidateInterviewData.answers?.length){
			playOnePauseOtherVideos()
		}
	}, [candidateInterviewData])
	return (
		<div>
			<Header title="Hiiree" />
			<div className="my-5">
				<div className="container">
					<h3>Review Interview</h3>
					{(loading || props.loading) ? (
						<div class="spinner-border text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					) : (
						<div className="mt-3">
							<p>Hi {props.basicDetails?.sharedInterview?.name}</p>
							<p>
								You have been invited to review the interview titled
								<span className="h5"> {props.basicDetails?.interview?.title}</span> at{" "}
								{props.basicDetails?.interview?.location}.
								Here you can provide your rating and comments for this interview.
							</p>

							<table className="my-4">
								<tr>
									<td>
										<h6>Candidate Name</h6>
									</td>
									<td className="px-3">
										<h6>{props.basicDetails?.candidate?.name}</h6>
									</td>
								</tr>
								<tr>
									<td>
										<h6>Interview Title</h6>
									</td>
									<td className="px-3">
										<h6>{props.basicDetails?.interview?.title}</h6>
									</td>
								</tr>
							</table>
							{!showDetails ? (
								<>
									<div className="my-3">
										<TextField onInput={e => { onInputCredentials("password", e.target.value) }} sx={{ width: '100%', margin: '4px' }} variant="outlined" type="password" label="Enter Password" value={credentials.password} />
									</div>
									<div className="d-flex align-items-center">
										<input
											id="check"
											type="checkbox"
											name=""
											checked={checkInfo}
											onChange={(e) => setCheckInfo(e.target.checked)}
											className="form-controll mt-1"
										/>
										<label htmlFor="check" className="py-0 m-0 mx-2">
											I verify that the above information is correct
										</label>
									</div>
									<div className="d-flex align-items-center">
										<input
											id="terms"
											type="checkbox"
											name=""
											checked={checkTerms}
											onChange={(e) => setCheckTerms(e.target.checked)}
											className="form-controll mt-1"
										/>
										<label htmlFor="terms" className="py-0 m-0 mx-2">
											I have read and understood all <a href="https://hiiree.com/terms.html" target="_blank">terms and conditions</a>{" "}
											and agree with them all
										</label>
									</div>
									<div className="d-flex mt-3 align-items-center">
										<h6 className="">Deadline:</h6>
										<h6>
											<span className="mx-3 ">{moment(props.basicDetails?.sharedInterview?.deadline).format("MM/DD/YYYY")}</span>
										</h6>
									</div>
									<p>
										This is the date untill when you can review and send your feedback for this interview.
									</p>
									<button
										disabled={
											!checkInfo || !checkTerms || credentials.password?.length === 0
												? true
												: false
										}
										onClick={onSubmit}
										className="btn btn-success"
									>
										Submit
									</button>
								</>
							) : (
								<Box sx={{ width: '100%' }}>
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
												value={rating}
												onChange={e => {
													setRating(parseInt(e.target.value))
												}}
											/>
											<TextField
												sx={{ width: '100%', marginTop: 2 }}
												label="Review"
												onInput={e => setReview(e.target.value)}
												InputLabelProps={{ shrink: true }}
												type="text"
												value={review}
												multiline={true}
												rows={5}
											/>
										</CardContent>
										<CardActions disableSpacing>
											<Button
												variant="contained"
												sx={{ marginLeft: "auto", marginRight: 2 }}
												onClick={onSetRating}
												disabled={btnLoading}
											>
												Save
											</Button>
											{showExitButton && (
											<a href="https://hiiree.com">
												<Button
													variant="contained"
													color="secondary"
													sx={{ marginLeft: "auto", background: "#222" }}
												>
													Exit
												</Button>
											</a>
											)}
										</CardActions>
									</Card>
								</Box>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = (state) => ({
	sharedInterview: state.sharedInterviews.sharedInterview,
	basicDetails: state.sharedInterviews.basicDetails,
	loading: state.sharedInterviews.loading,
});
const mapDispatchToProps = {
	fetchSharedInterviewDetails,
	editSharedInterview,
	fetchSharedInterviewDetailsPublic
};
export default connect(mapStateToProps, mapDispatchToProps)(InterviewDetailsPublic);