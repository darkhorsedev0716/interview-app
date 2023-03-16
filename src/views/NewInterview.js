import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import NewInterviewDialog from "../components/interviews/NewInterviewDialog"

export default function NewInterview () {
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const onModalClose = () => {
    setModalOpen(false)
    // Redirect to interview list
    navigate('/interviews/open')
  }

  const onNewInterviewClick = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <NewInterviewDialog open={modalOpen} onClose={onModalClose} />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
        }}
      >
        <Box sx={{
          textAlign: {
            xs: "center", sm: "left"
          }
        }}>
          <Typography component="p" variant="h5">Start the hiring process.</Typography>
          <Typography component="p" sx={{ mb: 2 }}>Create new interview by clicking on the below button.</Typography>
          <Button onClick={onNewInterviewClick} variant="contained">Create New Interview</Button>
        </Box>
      </Box>
    </>
  )
}