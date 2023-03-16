import {
  Card,
  CardContent,
  Typography
} from '@mui/material'

export default function (props) {
  const { count, title } = props

  return (
    <Card sx={{
      width: '100%'
    }}>
      <CardContent>
        <Typography variant="h5" component="p">{count}</Typography>
        <Typography
          variant="h6"
        >{title}</Typography>
      </CardContent>
    </Card>
  )
}