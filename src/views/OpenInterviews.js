import { Box } from "@mui/material"
import { useEffect, useState } from "react"
// import { getStatistic } from "../commons/sample-data"
import JobList from "../components/JobTable"

//redux
import { connect } from "react-redux";
import {fetchInterviews} from "../stores/interviews/actions";

function OpenInterviews (props) {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
      setJobs(props.interviews)
  }, [props.interviews])

  useEffect(() => {
    props.fetchInterviews("open")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <JobList jobs={jobs} />
    </Box>
  )
}
const mapStateToProps = (state) => ({
  interviews: state.interviews.openInterviews,
});
const mapDispatchToProps = {
  fetchInterviews
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenInterviews);