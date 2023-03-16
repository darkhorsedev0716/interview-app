import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import QuestionCategoryRow from "./QuestionCategoryRow";
import Swal from "sweetalert2";

//redux
import { connect } from "react-redux";
import {deleteCategory} from "../../../stores/categories/actions";
function QuestionCategoryTable ({ categories, deleteCategory, onSelectCategory }) {
  const onUpdate = (category) => {
    onSelectCategory(category)
  }
  const onDelete = async(id) => {
    Swal.fire({
      title: 'Do you want to delete this category?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      icon: "warning"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await deleteCategory(id)
      }
    })
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, n) => (
            <QuestionCategoryRow
              num={n + 1}
              category={category}
              onUpdate={onUpdate}
              onDelete={onDelete}
              key={category._id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  deleteCategory
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionCategoryTable);