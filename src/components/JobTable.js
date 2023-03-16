import { Paper, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function JobList(props) {
  const { jobs = [] } = props

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Job Title</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">ID</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Candidates</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Interviewed</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Pending</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 700, fontSize: '1em' }} variant="subtitle1">Shortlisted</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map(job => {
            const shortlistedCount = job.candidates?.filter(candidate => candidate.shortlisted)?.length || 0;
            const interviewedCount = job.candidates?.filter(candidate => candidate.status === "completed")?.length || 0;
            const pendingCount = job.candidates?.filter(candidate => candidate.status === "invited")?.length || 0;
            return (
              <TableRow key={job._id}>
                <TableCell><Link to={`/interviews/${job._id}`}>{job.title}</Link></TableCell>
                <TableCell>{job.jobId}</TableCell>
                <TableCell>{job.candidates?.length}</TableCell>
                <TableCell>{interviewedCount}</TableCell>
                <TableCell>{pendingCount}</TableCell>
                <TableCell>{shortlistedCount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}