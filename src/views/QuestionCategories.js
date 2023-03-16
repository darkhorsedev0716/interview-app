import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
// import { getQuestionCategories } from "../commons/sample-data"
import AddCategoryDialog from "../components/questions/question-categories/AddCategoryDialog"
import QuestionCategoryTable from "../components/questions/question-categories/QuestionCategoryTable"

//redux
import { connect } from "react-redux";
import {fetchCategories} from "../stores/categories/actions";

function QuestionCategories (props) {
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({})

  const onAddCategoryModalClose = e => {
    setIsModalOpen(false)
  }

  const onAddCategoryModalClick = e => {
    e.preventDefault()
    setIsModalOpen(true)
  }
  useEffect(()=>{
    props.fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    setCategories(props.categories)
  }, [props.categories])
  useEffect(()=>{
    if(!isModalOpen){
      setSelectedCategory({})
    }
  }, [isModalOpen])
  return (
    <>
      <AddCategoryDialog 
        open={isModalOpen} 
        onClose={onAddCategoryModalClose} 
        category={selectedCategory}
      />
      <Box sx={{
        width: '100%',
        textAlign: 'right',
        mb: {
          xs: 1,
          md: 2
        }
      }}>
        <Button
          variant="contained"
          size="large"
          onClick={onAddCategoryModalClick}
        >Add New Category</Button>
      </Box>
      <QuestionCategoryTable 
        categories={categories} 
        onSelectCategory={(item)=>{
          setSelectedCategory(item)
          setIsModalOpen(true)
        }}
      />
    </>
  )
}
const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});
const mapDispatchToProps = {
  fetchCategories
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionCategories);