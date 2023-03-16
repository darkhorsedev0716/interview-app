import { Card, CardContent, Typography } from "@mui/material"
// import { useEffect, useRef } from "react"
// import Chart from "chart.js/auto"

function StatCard (props) {
  const {
    title,
    tableData = [],
    // chartData = [10, 1, 5, 4, 20, 25, 10],
    // chartColor = 'rgba(0, 255, 0, 0.15)',
    onClick = () => {},
    active
  } = props

  // const canvasRef = useRef()

  // useEffect(() => {
  //   const chartConfig = {
  //     type: 'line',
  //     data: {
  //       labels: chartData.map((d) => `null`),
  //       datasets: [{
  //         backgroundColor: chartColor,
  //         borderWidth: 0,
  //         data: chartData,
  //         label: 'Open',
  //         fill: true,
  //         tension: 0.33,
  //         pointRadius: 0
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         x: {
  //           display: false,
  //           grid: { display: false },
  //           ticks: { display: false }
  //         },
  //         y: {
  //           display: false,
  //           grid: { display: false },
  //           ticks: { display: false },
  //           suggestedMax: Math.max(...chartData) + 1
  //         }
  //       },
  //       plugins: {
  //         responsive: true,
  //         legend: {
  //           display: false
  //         }
  //       }
  //     }
  //   }
  //   new Chart(canvasRef.current, chartConfig)
  // }, [chartColor, chartData])

  return (
    <div style={{ cursor: 'pointer' }}>
      <Typography variant="h6">{title}</Typography>
      <Card
        onClick={onClick}
        sx={{
          borderRadius: '1em',
          boxShadow: active && '5px 5px 20px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          height: '200px',
          transition: 'box-shadow 0.5s'
        }}
      >
        {/* <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: '-1px',
            left: 0
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
          </canvas>
        </div> */}
        <CardContent>
          <table style={{ width: '100%' }}>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <td>{row.title}</td>
                  <td style={{ textAlign: 'right' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatCard
