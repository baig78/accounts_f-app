import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import { Chart } from 'highcharts';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent  {

  canvasData: any;
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
      data: [89, 34, 43, 54, 28, 74, 93],
      label: 'Payment Received',
      // fill: true,
      // backgroundColor: 'rgba(255, 255, 0, 0.3)',
      // borderColor: 'black',
      tension: 0.5
    },
    {
      data: [21, 34, 43, 54, 62, 74, 93],
      label: 'Payment Sent',
      // fill: true,
      // backgroundColor: 'rgba(255, 255, 0, 0.3)',
      // borderColor: 'black',
      tension: 0.5
    }
  ]
  }

}
