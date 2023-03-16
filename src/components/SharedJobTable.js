import { Paper, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Typography, Tooltip, IconButton, Rating } from "@mui/material"
import { Link } from "react-router-dom"
import { Delete, Edit } from "@mui/icons-material"
import moment from "moment"
import Swal from "sweetalert2"
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import { useNavigate } from "react-router"

//redux
import { connect } from "react-redux"
import { deleteSharedInterview } from "../stores/sharedInterviews/actions"
function SharedJobList(props) {
	const navigate = useNavigate()
	const { jobs = [] } = props
	const onDelete = async (id) => {
		Swal.fire({
			title: 'Do you want to delete this category?',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			icon: "warning"
		}).then(async (result) => {
			if (result.isConfirmed) {
				await props.deleteSharedInterview(id)
			}
		})
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ width: '100%' }}>
				<TableHead>
					<TableRow>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Job Title</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">ID</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Candidate</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Name</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Email</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Phone</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Deadline</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Review</Typography></TableCell>
						<TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Action</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{jobs.map(job => {
						const shortlistedCount = job.candidates?.filter(candidate => candidate.shortlisted)?.length || 0;
						const interviewedCount = job.candidates?.filter(candidate => candidate.status === "completed")?.length || 0;
						const pendingCount = job.candidates?.filter(candidate => candidate.status === "invited")?.length || 0;
						return (
							<TableRow key={job._id}>
								<TableCell><Link to={`/interviews/${job.interviewId?._id}`}>{job.interviewId?.title}</Link></TableCell>
								<TableCell>{job.interviewId?.jobId}</TableCell>
								<TableCell><Link to={`/interviews/${job.interviewId?._id}/candidate-interviews/${job.candidateId?._id}`}>{job.candidateId?.name}</Link></TableCell>
								<TableCell>{job.name}</TableCell>
								<TableCell>{job.email}</TableCell>
								<TableCell>{job.phone}</TableCell>
								<TableCell>{moment(job.deadline).format("MM/DD/YYYY")}</TableCell>
								<TableCell>
                <IconButton size="small" onClick={e => navigate(`/interviews/shared-review/${job._id}/${job.password}`)}>
                  <VideoCameraFrontIcon size="small" style={{fill: job.comments?.length > 0 ? "#1976d2" : "gray"}}/>
                </IconButton>
								</TableCell>
								<TableCell>
									{/* <Tooltip title="Update">
										<span>
											<IconButton size="small" onClick={() => { }}>
												<Edit size="small" />
											</IconButton>
										</span>
									</Tooltip> */}
									<Tooltip title="Delete">
										<span>
											<IconButton size="small" onClick={() => onDelete(job._id)}>
												<Delete size="small" />
											</IconButton>
										</span>
									</Tooltip>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
	deleteSharedInterview
};
export default connect(mapStateToProps, mapDispatchToProps)(SharedJobList);