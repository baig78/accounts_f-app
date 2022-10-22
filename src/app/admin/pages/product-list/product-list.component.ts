import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProoductListComponent implements OnInit { data: any;
  buttons: TableBtn[] | any;
  columns: TableColumn | any;

  dataPesticides: any;
  columnsPesticides: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';   
  totalVolume: number = 0;   
  fillerNav: string[] | any;
  @ViewChild(MatAccordion) accordion: MatAccordion | any;
  tabTwo: string | any;
  title:string = 'Product List'
  constructor() { }

  ngOnInit(): void {
    this.tabTwo ="Fertilizers1"
    this.fillerNav = ['1 nav','2 nav'];
    this.columns = [
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'brand', header: 'Brand', cell: (element: any) => `${element.brand}`},
      { columnDef: 'sku', header: 'SKU', cell: (element: any) => `${element.sku}`},
      { columnDef: 'price', header: 'Price', cell: (element: any) => `${element.price}`
     }
    ]
    this.data = [
      { name: 'Gromor', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
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



    this.columnsPesticides = [
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element.name}` },
      { columnDef: 'brand', header: 'Brand', cell: (element: any) => `${element.brand}`},
      { columnDef: 'sku', header: 'SKU', cell: (element: any) => `${element.sku}`},
      { columnDef: 'price', header: 'Price', cell: (element: any) => `${element.price}`
     }
    ]
    this.dataPesticides = [
      { name: 'Gromor', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
      { name: 'Hydrogen1', brand: '12', 'sku':'sdf','price':'sdf' },
    ];
  }
  buttonClick(result: string[]) { }
  
  myButton() {
    console.log("my button was clicked!");
  }

  uploadFile(){
    
    // $("#fileUPload").click()
    let theEvent = document.createEvent("MouseEvent");
theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
var element:any = document.getElementById('fileUPload');
element.dispatchEvent(theEvent);
  }
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