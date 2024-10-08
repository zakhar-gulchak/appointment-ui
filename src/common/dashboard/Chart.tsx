import { createSignal } from 'solid-js'
import { SolidApexCharts } from 'solid-apexcharts'

import Title from './Title'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Chart (props: any) {
  const [options] = createSignal({
    chart: {
      id: 'solidchart-example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  })
  const [series] = createSignal({
    list: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
  })

  return (
    <>
      <Title>Today</Title>
      <SolidApexCharts
        width='500'
        type='bar'
        options={options()}
        series={series().list}
        {...props}
      />
      ;
    </>
  )
}
