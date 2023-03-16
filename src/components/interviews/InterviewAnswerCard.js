import { Card, CardContent, CardHeader, CardMedia, Rating, TextField } from "@mui/material";
import { useState } from "react";

export default function InterviewAnswerCard({ answer, onGiveRating, onGiveReview, index, hideReviews }) {
  return (
    <Card>
      <CardHeader title={answer.questionId?.question}>{answer.questionId?.question}</CardHeader>
      <CardMedia
        component="video"
        src={answer.videoLink}
        controls
      />
      {!hideReviews && (
        <CardContent>
          <div>Rating</div>
          <Rating
            value={parseInt(answer.rating)}
            onChange={e => {
              onGiveRating(parseInt(e.target.value), index)
            }}
          />
          <TextField
            sx={{ width: '100%', marginTop: 2 }}
            label="Review"
            onInput={e => onGiveReview(e.target.value, index)}
            InputLabelProps={{ shrink: true }}
            type="text"
            value={answer.comments}
          />
        </CardContent>
      )}
    </Card>
  )
}