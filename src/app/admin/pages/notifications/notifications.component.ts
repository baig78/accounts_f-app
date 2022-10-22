import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  buttons: TableBtn[] | any;

  dataUsers: any;
  columnsUsers: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';   
  totalVolume: number = 0;   
  fillerNav: string[] | any;
  constructor() { }

  ngOnInit(): void {
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    this.columnsUsers = [
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'description', header: 'Description', cell: (element: any) => `${element.description}`},
      { columnDef: 'data_time', header: 'Data & Time', cell: (element: any) => `${element.data_time}`},
    ]

    this.dataUsers = [
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
      { 'name': 'Diseases-1', 'description': 'desc....', 'data_time':'09/12/2022 22:10'},
    ];
  }
  buttonClick(e:any){}

}
export interface UserData {
  id: string;
  name: string;
  date: Date;
  rides: number;
  volume?: string;
  material: string;
}
export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (arg0: any) => string;
}
export interface TableBtn {
  styleClass: string;
  icon: string;
  payload: (arg0: any) => string;
  action: string;
}