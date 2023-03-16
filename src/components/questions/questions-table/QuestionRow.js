import { Delete, Edit } from "@mui/icons-material"
import { IconButton, Switch, TableCell, TableRow, Tooltip } from "@mui/material"
import React, {useEffect, useState} from "react"

//redux
import { connect } from "react-redux";
import {editQuestion} from "../../../stores/questions/actions";

//helpers
import { showAlert } from "../../../helpers/";

function QuestionRow (props) {
  const {
    num,
    question,
    onUpdate = () => {},
    onDelete = () => {}
  } = props
  const [isFavourite, setFavourite] = useState(false)
  const handleEditQuestion = async(favourite) =>{
    try{
      setFavourite(favourite)
      await props.editQuestion(question._id, {
        ...question,
        favourite
      })
      showAlert({ title: "Success!", message: favourite ? `Question marked as favourite!` : 'Removed question from favourite!', type: "success" })
    }catch(err){
      setFavourite(!favourite)
      showAlert({ title: "Error!", message: `Something went wrong!`, type: "error" })
    }
  }
  useEffect(()=>{
    setFavourite(question.favourite)
  }, [question.favourite])
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{question.question}</TableCell>
      <TableCell>{`${question.time} ${question.timeUnit}${question.time > 1 ? 's' : ''}`}</TableCell>
      <TableCell>{question.categoryId?.name || "N/A"}</TableCell>
      <TableCell>
        <Switch checked={isFavourite} onChange={(e) => handleEditQuestion(e.target.checked)} />
      </TableCell>
      <TableCell>
        <Tooltip title="Update question">
          <span>
            <IconButton size="small" onClick={() => { onUpdate(question) }}>
              <Edit size="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete questions">
          <span>
            <IconButton size="small" onClick={() => { onDelete(question._id) }}>
              <Delete size="small" />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  editQuestion
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionRow);