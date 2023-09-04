import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent  {

  barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
      data: [89, 34, 43, 54, 28, 74, 93],
      label: 'Purchased Amount',
      // fill: true,
      // backgroundColor: 'rgba(255, 255, 0, 0.3)',
      // borderColor: 'black',
      // tension: 0.5
    },
    {
      data: [89, 34, 43, 54, 28, 74, 93],
      label: 'Sold Amount',
      // fill: true,
      // backgroundColor: 'rgba(255, 255, 0, 0.3)',
      // borderColor: 'black',
      // tension: 0.5
    }
   
  ]
  }
}
