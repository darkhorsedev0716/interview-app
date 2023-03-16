import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material"

export default function QuestionCategoryRow ({ num, category, onDelete, onUpdate }) {
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        {/* Actions goes here, but it's not in the docs (yet) */}
        <Tooltip title="Update category">
          <span>
            <IconButton size="small" onClick={() => onUpdate(category)}>
              <Edit size="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete category">
          <span>
            <IconButton size="small" onClick={() => onDelete(category._id)}>
              <Delete size="small" />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}