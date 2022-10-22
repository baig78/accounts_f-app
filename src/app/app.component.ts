import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../app/admin/services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'myApp';
  constructor(
    public router: Router,
    public DashboardService: DashboardService,

    ) {}
  ngOnInit(): void {
    this.DashboardService.selectedProduct$.subscribe((value) => {
      // this.selectedProduct = value;
      if (value == true) {
        // alert('app alert')
      }
    });
  }
}
