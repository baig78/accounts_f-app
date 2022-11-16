import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  buttons: TableBtn[] | any;
  columns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';   
  totalVolume: number = 0;   
  fillerNav: string[] | any;
  title='Dashboard';

  
 
  constructor( ) { }

  ngOnInit(): void {
    this.fillerNav = ['1 nav','2 nav'];
    this.columns = [
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'age', header: 'Age', cell: (element: any) => `${element.age}`
     }
    ]
    this.data = [
      { name: 'Hydrogen1', age: '12' },
      { name: 'Hydrogen2', age: '12' },
      { name: 'Hydrogen3', age: '12' },
      { name: 'Hydrogen4', age: '12' },
      { name: 'Hydrogen5', age: '12' },
      { name: 'Hydrogen6', age: '12' },
      { name: 'Hydrogen7', age: '12' },
      { name: 'Hydrogen8', age: '12' },
      { name: 'Hydrogen', age: '12' },
    ];
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];
    this.data.forEach((user:any) => {
      this.totalVolume = this.totalVolume + parseInt(user.volume);
      this.totalRides = this.totalRides + user.rides;
    });
    this.footer = `Total volume: ${this.totalVolume}m³ / trips: ${this.totalRides}`;
  }
  buttonClick(result: string[]) { }
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


