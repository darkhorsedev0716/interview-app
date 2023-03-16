import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import SelectQuestionsToAddTable from "./SelectQuestionsToAddTable"

//redux
import { connect } from "react-redux";
import {fetchQuestions} from "../../../stores/questions/actions";
import {fetchCategories} from "../../../stores/categories/actions";
import {editInterview} from "../../../stores/interviews/actions";

//helpers
import { showAlert } from "../../../helpers/";
function AddQuestionsToInterviewDialog (props) {
  const {
    open,
    onClose = () => {}
  } = props

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)

  const onSwitchCategoryFilter = e => {
    setSelectedCategory(e.target.value)
    // Change the category filter here.
    // ...
  }

  const onQuestionAdded = (questionId, action) => {
    let selectedQuestionsTemp = [...selectedQuestions]
    if(action === "add"){
      selectedQuestionsTemp.push(questionId)
      setSelectedQuestions(selectedQuestionsTemp)
    }else{
      setSelectedQuestions(selectedQuestionsTemp.filter(question => question !== questionId))
    }
  }

  const handleSubmit = async() =>{
    try{
      setBtnLoading(true)
      await props.editInterview(props.interview._id, {
        ...props.interview,
        questions: selectedQuestions,
        candidates: props.interview?.candidates?.map(candidate => candidate._id) || []
      })
      showAlert({ title: "Success!", message: "Question set updated", type: "success" })
      onClose()
    }catch(err){
      let message = "Something went wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setBtnLoading(false)
    }
  }
  useEffect(() => {
    props.fetchQuestions()
    props.fetchCategories()
  }, [])

  useEffect(() => {
    setAllQuestions(props.questions)
  }, [props.questions])
  useEffect(()=>{
    setSelectedQuestions(props.selectedQuestions)
  }, [props.selectedQuestions])
  useEffect(()=>{
    if(selectedCategory !== "all"){
      let filteredQuestions = props.questions.filter(question => question.categoryId?._id === selectedCategory)
      setAllQuestions(filteredQuestions)
    }else{
      setAllQuestions(props.questions)
    }
  }, [selectedCategory, props.questions])
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle title="Add Questions to Interview" />
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="select-question-category">Question Category</InputLabel>
          <Select
            id="select-question-category"
            onChange={onSwitchCategoryFilter}
            label="Category"
            sx={{
              width: '100%'
            }}
            value={selectedCategory}
          >
            <MenuItem value='all'>All</MenuItem>
            {props.categories.map((category, i) => (
              <MenuItem value={category._id} key={i}>{category.name}</MenuItem>
            ))}
          </Select>
          <SelectQuestionsToAddTable
            questions={allQuestions}
            onQuestionAdded={onQuestionAdded}
            selectedQuestions={selectedQuestions}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={btnLoading}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  categories: state.categories.categories,
  interview: state.interviews.interview,
});
const mapDispatchToProps = {
  fetchQuestions,
  fetchCategories,
  editInterview
};
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionsToInterviewDialog);