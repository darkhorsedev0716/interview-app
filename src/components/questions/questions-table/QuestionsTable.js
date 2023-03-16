import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import QuestionRow from "./QuestionRow"
import Swal from "sweetalert2";

//redux
import { connect } from "react-redux";
import {deleteQuestion} from "../../../stores/questions/actions";
function QuestionsTable (props) {
  const {
    questions = [],
    onUpdate = () => {}
  } = props

  const onDelete = questionId => {
    Swal.fire({
      title: 'Do you want to delete this question?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      icon: "warning"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await props.deleteQuestion(questionId)
      }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Favorite</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, n) => (
            <QuestionRow
              num={n + 1}
              question={question}
              onUpdate={() => onUpdate(question)}
              onDelete={onDelete}
              key={question._id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  deleteQuestion
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTable);