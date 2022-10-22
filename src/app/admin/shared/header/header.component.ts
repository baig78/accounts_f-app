import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Input() title:string | any;
  headTitle: any;

  constructor() { }

  ngOnInit(): void {
    this.headTitle = this.title;
  }

}
