import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material"

export default function SystemUserRow ({ num, manager, onDelete, onUpdate }) {
  return (
    <TableRow>
      <TableCell>{num}</TableCell>
      <TableCell>{manager.name}</TableCell>
      <TableCell>{manager.email}</TableCell>
      <TableCell>{manager.username}</TableCell>
      <TableCell>
        {/* Actions goes here, but it's not in the docs (yet) */}
        {/* <Tooltip title="Update manager">
          <span>
            <IconButton size="small" onClick={() => onUpdate(manager)}>
              <Edit size="small" />
            </IconButton>
          </span>
        </Tooltip> */}
        <Tooltip title="Delete manager">
          <span>
            <IconButton size="small" onClick={() => onDelete(manager._id)}>
              <Delete size="small" />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}