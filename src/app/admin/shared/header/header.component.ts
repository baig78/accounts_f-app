import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
interface purchase {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Input() title:string | any;
  headTitle: any;
  purchases: purchase[] = [
    {value: 'units', viewValue: 'Cinderella'},
    {value: 'units', viewValue: 'Kampala'},
  ];
  bordersControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.headTitle = this.title;
  }

}
