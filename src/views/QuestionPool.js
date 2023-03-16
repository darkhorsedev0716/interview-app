import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionEditorDialog from "../components/questions/question-editor-dialog/QuestionEditorDialog";
import QuestionsTable from "../components/questions/questions-table/QuestionsTable";

//redux
import { connect } from "react-redux";
import {fetchQuestions} from "../stores/questions/actions";
import {fetchCategories} from "../stores/categories/actions";
function QuestionPool (props) {
  const [questions, setQuestions] = useState([])
  const [questionModalOpen, setQuestionModalOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)

  const onSuccess = () => {
    // This is called when a question is successfully added/edited.
  }

  const onAddNewQuestion = () => {
    setActiveQuestion(null)
    setQuestionModalOpen(true)
  }

  const onUpdate = question => {
    setActiveQuestion(question)
    setQuestionModalOpen(true)
  }

  useEffect(()=>{
    props.fetchQuestions()
    props.fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    setQuestions(props.questions)
  }, [props.questions])
  return (
    <Box sx={{
      xs: '100%'
    }}>
      <Box sx={{
        textAlign: 'right',
        mb: {
          sx: 1,
          md: 2
        }
      }}>
        <QuestionEditorDialog
          open={questionModalOpen}
          onClose={() => { setQuestionModalOpen(false) }}
          onSuccess={onSuccess}
          question={activeQuestion}
        />
        <Button
          variant="contained"
          onClick={onAddNewQuestion}
        >Add New Question</Button>
      </Box>
      <QuestionsTable
        questions={questions}
        onUpdate={onUpdate}
      />
    </Box>
  )
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});
const mapDispatchToProps = {
  fetchQuestions,
  fetchCategories
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionPool);