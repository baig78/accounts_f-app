import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent  {
  doughnutChartData = {
    labels: ["Purchase", "Revenue", "Expense"],
    datasets: [{
      data: [89, 34, 43],
      label: 'Sales Percent',
      fill: true,
      backgroundColor: [
        'rgba(255,0,25,0.7)',
'rgba(0,255,25,0.7)',
'rgba(0,25,255,0.7)',
'rgba(67,25,255,0.7)',
'rgba(67,25,78,0.7)',
'rgba(167,125,78,0.7)',
'rgba(67,255,178,0.7)',
      ]
      // borderColor: 'black',
      // tension: 0.5
    }]
  }
  doughnutChartOption ={
    responsive: false
    }

}
