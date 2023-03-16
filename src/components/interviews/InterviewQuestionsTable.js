import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"

export default function InterviewQuestionsTable (props) {
  const { questions } = props

  return (
    <TableContainer
      sx={{ width: '100%' }}
      component={Paper}
    >
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.categoryId?.name || "N/A"}</TableCell>
              <TableCell>{`${question.time} ${question.timeUnit}${question.time > 1 ? 's' : ''}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}