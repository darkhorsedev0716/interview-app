import { Dialog, DialogTitle, DialogContent, Grid, TextField, MenuItem, DialogActions, Button, FormControl, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useState } from "react"

//redux
import { connect } from "react-redux";
import { createQuestion, editQuestion } from "../../../stores/questions/actions";

//helpers
import { showAlert } from "../../../helpers/";
import { Add } from "@mui/icons-material";
import AddCategoryDialog from "../question-categories/AddCategoryDialog";

function QuestionEditorDialog({
  question,
  open,
  onClose,
  onSuccess,
  categories,
  createQuestion,
  editQuestion
}) {
  const [questionData, setQuestionData] = useState(question ?? {
    id: null,
    question: '',
    duration: 0,
    timeUnit: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)
  const timeUnits = [
    // { label: "Hour", value: "hour" },
    { label: "Minute", value: "minute" },
    { label: "Second", value: "second" }
  ]

  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false)

  useEffect(() => {
    setQuestionData(!question ? {
      id: null,
      question: '',
      duration: 0,
      category: ''
    } : {
      id: question._id,
      question: question.question,
      duration: question.time,
      timeUnit: question.timeUnit,
      category: question.categoryId?._id
    })
  }, [question])

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (question) {
        // If question is defined, update the question
        // with that has ID indicated by question.id
        await editQuestion(question._id, {
          question: questionData.question,
          categoryId: questionData.category,
          timeUnit: questionData.timeUnit,
          time: questionData.duration,
        })
        showAlert({ title: "Success!", message: `Question updated successfully!`, type: "success" })
      } else {
        // Otherwise submit a new question
        await createQuestion({
          question: questionData.question,
          categoryId: questionData.category,
          timeUnit: questionData.timeUnit,
          time: questionData.duration,
        })
        showAlert({ title: "Success!", message: `Question created successfully!`, type: "success" })
      }
      onSuccess() // Only call onSuccess if this works
      onClose() // Close the dialog when done.
    } catch (err) {
      let message = "Something went wrong!";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    } finally {
      setLoading(false)
    }
  }

  const onChangeQuestionData = (k, v) => {
    setQuestionData({
      ...questionData,
      [k]: v
    })
  }
  return (
    <Dialog sx={{ width: '100%' }} open={open} onClose={onClose}>
      <DialogTitle title={`${question ? 'Update' : 'Add'} Question`}>{`${question ? 'Update' : 'Add'} Question`}</DialogTitle>
      <AddCategoryDialog
        open={newCategoryDialogOpen}
        onClose={() => {
          setNewCategoryDialogOpen(false)
        }}
      />
      <form onSubmit={onSubmit}>
        <FormControl>
          <DialogContent
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2} sx={{ width: '100%' }}>
              <Grid item xs={12}>
                <TextField
                  select
                  onChange={e => {
                    if (e.target.value === false) {
                      setNewCategoryDialogOpen(true)
                    } else {
                      onChangeQuestionData('category', e.target.value)
                    }
                  }}
                  label="Category"
                  sx={{
                    width: '100%'
                  }}
                  value={questionData.category}
                >
                  <MenuItem value={false}>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText>Add new category...</ListItemText>
                  </MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onInput={e => { onChangeQuestionData('question', e.target.value) }}
                  label="Question"
                  value={questionData.question}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  onInput={e => { onChangeQuestionData('duration', e.target.value) }}
                  type="number"
                  label="Duration"
                  value={questionData.duration}
                  sx={{ width: '100%' }}
                  InputProps={{
                    inputProps: {
                      max: (questionData.timeUnit === "second") ? 60 : 5, min: 0
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  onChange={e => { onChangeQuestionData('timeUnit', e.target.value) }}
                  label="Time Unit"
                  sx={{
                    width: '100%'
                  }}
                  value={questionData.timeUnit}
                >
                  {timeUnits.map(item => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {question ? 'Update Question' : 'Add Question'}
            </Button>
          </DialogActions>
        </FormControl>
      </form>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});
const mapDispatchToProps = {
  createQuestion,
  editQuestion
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditorDialog);