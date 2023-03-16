import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export default function SelectQuestionsToAddTable (props) {
  const {
    questions = [],
    selectedQuestions = [],
    onQuestionAdded = () => {}
  } = props
  return (
    <TableContainer
      component={Paper}
      sx={{ width: '100%' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Add To Interview</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, n) => (
            <TableRow key={n}>
              <TableCell>{n + 1}</TableCell>
              <TableCell>{question.question}</TableCell>
              <TableCell>{`${question.time} ${question.timeUnit}`}</TableCell>
              <TableCell>{question.categoryId?.name || "N/A"}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => { onQuestionAdded(question._id, selectedQuestions.includes(question._id) ? "remove" : "add") }}
                  color={selectedQuestions.includes(question._id) ? "error" : "primary"}
                >
                  {selectedQuestions.includes(question._id) ? "Remove" : "Add"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}