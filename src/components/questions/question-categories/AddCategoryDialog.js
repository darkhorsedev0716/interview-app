import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

//redux
import { connect } from "react-redux";
import {createCategory, editCategory} from "../../../stores/categories/actions";

//helpers
import { showAlert } from "../../../helpers/";

function AddCategoryDialog ({
  open,
  onClose = () => {},
  createCategory = () => {},
  editCategory = () =>{},
  category
}) {
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    try{
      e.preventDefault()
      setLoading(true)
      if(category?._id){
        await editCategory(category._id, {name: categoryName})
      }else{
        await createCategory({name: categoryName})
      }
      showAlert({ title: "Success!", message: `Category ${category?._id ? "updated" : "created"} successfully!`, type: "success" })
      onClose()
    }catch(err){
      let message = "Something went wrong!";
      if(err?.response?.data?.message){
        message = err?.response?.data?.message
      }
      showAlert({ title: "Error!", message, type: "danger" })
    }finally{
      setLoading(false)
    }
  }
  const onInput = e => {
    setCategoryName(e.target.value)
  }
  useEffect(()=>{
    if(category?.name){
      setCategoryName(category.name)
    }else{
      setCategoryName("")
    }
  }, [category])
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ width: '100%' }}
            onInput={onInput}
            value={categoryName}
            label="Category Name"
            sx={{
              width: {
                md: '500px'
              }
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {category?._id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  createCategory,
  editCategory
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryDialog);