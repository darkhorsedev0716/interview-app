import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function JobChart ({ jobs })  {
  const [chartValues, setChartValues] = useState([0,0,0])
  const data = {
    labels: ['Pending', 'Interviewed', 'Cancelled'],
    datasets: [
      {
        label: '',
        data: chartValues,
        backgroundColor: [
          'rgb(255, 206, 86)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(()=>{
    let pendingCount = 0, interviewedCount=0,cancelledCount=0;
    jobs.map((job)=>{
      job.candidates.map((candidate)=>{
        if(candidate.status === "invited"){
          pendingCount++
        }else if(candidate.status === "completed"){
          interviewedCount++
        }else if(candidate.status === "cancelled"){
          cancelledCount++;
        }
      })
    })
    setChartValues([pendingCount, interviewedCount, cancelledCount])
  }, [jobs])
  return (
    <Card
      sx={{
        height: '100%'
      }}
    >
      <Pie data={data} />
    </Card>
  )
}
