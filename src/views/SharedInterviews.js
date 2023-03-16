import { Box } from "@mui/material"
import SharedJobTable from "../components/SharedJobTable"
import { useEffect, useState } from "react"

//redux
import { connect } from "react-redux";
import {fetchSharedInterviews} from "../stores/sharedInterviews/actions";

function SharedInterviews (props) {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
      setJobs(props.interviews)
  }, [props.interviews])

  useEffect(() => {
    props.fetchSharedInterviews()
  }, [])
  return (
    <Box>
      <SharedJobTable jobs={jobs} />
    </Box>
  )
}
const mapStateToProps = (state) => ({
  interviews: state.sharedInterviews.sharedInterviews,
});
const mapDispatchToProps = {
  fetchSharedInterviews
};
export default connect(mapStateToProps, mapDispatchToProps)(SharedInterviews);