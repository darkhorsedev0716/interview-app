import { Card, Box, Stack, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStatistic } from "../commons/sample-data";
import JobChart from "../components/dashboard/JobChart";
import JobList from "../components/JobTable";
import {useNavigate} from "react-router";

import StatCard from "../components/stat-card/StatCard";

//redux
import { connect } from "react-redux";
import {fetchInterviews} from "../stores/interviews/actions";

function Dashboard (props) {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState()
  const [activeStatus, setActiveStatus] = useState("open")
  const [statistics, setStatistics] = useState([])

  // Fetch data on component mount
  useEffect(() => {
    const fetchedStatistics = getStatistic()
    setStatistics(fetchedStatistics)
    props.fetchInterviews("open")
    props.fetchInterviews("on_hold")
    props.fetchInterviews("closed")
    setActiveView('Open')
  }, [])

  const onSwitchActiveView = (view, status) => {
    // Replace this with actual fetching
    setActiveView(view)
    setActiveStatus(status)
  }

  useEffect(()=>{
    const fetchedStatistics = getStatistic()
    let statsData = [...fetchedStatistics];
    if(props.openInterviews.length){
      let totalOpenJobs = props.openInterviews.length;
      let shortlisted = 0, invited = 0, totalCandidates = 0;
      props.openInterviews.map((interview)=>{
        totalCandidates += interview.candidates.length
        interview.candidates.map((candidate)=>{
          if(candidate.shortlisted){
            shortlisted++;
          }
          if(candidate.status === "invited"){
            invited++;
          }
        })
      })
      statsData[0].summary = [
        { title: "Open jobs", value: totalOpenJobs},
        { title: "Jobs with Interviews ready for review", value: 0 },
        { title: "Total candidates", value: totalCandidates },
        { title: "Pending interviews", value: invited },
        { title: "Candidates shortlisted", value: shortlisted }
      ]
    }
    if(props.closedInterviews.length){
      let totalClosedJobs = props.closedInterviews.length;
      let shortlisted = 0, invited = 0, completed = 0, totalCandidates=0;
      props.closedInterviews.map((interview)=>{
        totalCandidates += interview.candidates.length
        interview.candidates.map((candidate)=>{
          if(candidate.shortlisted){
            shortlisted++;
          }
          if(candidate.status === "completed"){
            completed++;
          }
        })
      })
      statsData[1].summary = [
        { title: "Closed jobs", value: totalClosedJobs},
        { title: "Jobs with interviews received", value: 0 },
        { title: "Total candidates", value: totalCandidates },
        { title: "Completed interviews", value: completed },
        { title: "Candidates shortlisted", value: shortlisted }
      ]
    }
    if(props.onHoldInterviews.length){
      let totalOnHoldJobs = props.onHoldInterviews.length;
      let shortlisted = 0, invited = 0, completed = 0, totalCandidates=0;
      props.onHoldInterviews.map((interview)=>{
        totalCandidates += interview.candidates.length
        interview.candidates.map((candidate)=>{
          if(candidate.shortlisted){
            shortlisted++;
          }
          if(candidate.status === "completed"){
            completed++;
          }
        })
      })
      statsData[2].summary = [
        { title: "On Hold jobs", value: totalOnHoldJobs},
        { title: "Jobs with interviews received", value: 0 },
        { title: "Total candidates", value: totalCandidates },
        { title: "Completed interviews", value: completed },
        { title: "Candidates shortlisted", value: shortlisted }
      ]
    }
    setStatistics(statsData)
  }, [props.openInterviews, props.closedInterviews, props.onHoldInterviews])

  useEffect(()=>{
    if(props.profile?.role === "admin"){
      navigate("/admin/users")
    }
  }, [props.profile])
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Grid sx={{ width: '100%' }} spacing={2} container>
          {statistics.map((stats, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <StatCard
                title={stats.title}
                tableData={stats.summary}
                chartData={stats.chartData}
                chartColor='rgba(0, 255, 0, 0.1)'
                key={i}
                active={activeView === stats.title}
                onClick={() => { 
                  onSwitchActiveView(stats.title, stats.status) 
                }}
              />
            </Grid>
          ))}
        </Grid>
        <div>
          <Typography variant="h6">{activeView}</Typography>
          <Stack spacing={2} direction={
            { sm: 'column', md: 'row' }
          }>
            <Box
              sx={{
                width: { xs: '100%', md: '60%' }
              }}
            >
              <Card>
                <JobList jobs={activeStatus === "open" ? props.openInterviews : activeStatus === "closed" ? props.closedInterviews : props.onHoldInterviews} />
              </Card>
            </Box>
            <JobChart jobs={activeStatus === "open" ? props.openInterviews : activeStatus === "closed" ? props.closedInterviews : props.onHoldInterviews} />
          </Stack>
        </div>
      </Stack>
    </Box>
  )
}
const mapStateToProps = (state) => ({
  openInterviews: state.interviews.openInterviews,
  closedInterviews: state.interviews.closedInterviews,
  onHoldInterviews: state.interviews.onHoldInterviews,
  profile: state.profile.profile
});
const mapDispatchToProps = {
  fetchInterviews,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);