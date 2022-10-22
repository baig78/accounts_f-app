import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
interface supplier {
  value: string;
  viewValue: string;
}
interface unit {
  value: string;
  viewValue: string;
}

interface payment {
  value: string;
  viewValue: string;
}
interface staff {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss']
})
export class PurchaseReturnComponent implements OnInit {
  productctrl!: FormControl;
  disabled: boolean = true;
  buttons: TableBtn[] | any;
  date = new FormControl(new Date());
  suppliers: supplier[] = [
    {value: 'cinderella', viewValue: 'Cindrella'},
    {value: 'Kampala', viewValue: 'Kampala'},
  ];
  units: unit[] = [
    {value: 'units', viewValue: 'Pcs'},
  ];
  payments: payment[] = [
    {value: 'check', viewValue: 'Check'},
    {value: 'bank_transfer', viewValue: 'Bank Transfer'},
    {value: 'cash', viewValue: 'Cash'},
    {value: 'phonepe', viewValue: 'Phone Pe'},
  ];
  staffs: staff[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'Inactive'},
  ];
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
      { columnDef: 's_no', header: '#', cell: (element: any) => `${element.s_no}` },
      { columnDef: 'purchase_code', header: 'Purchase Code', cell: (element: any) => `${element.purchase_code}`},
      { columnDef: 'date', header: 'Date', cell: (element: any) => `${element.date}`},
      { columnDef: 'supplier', header: 'Supplier', cell: (element: any) => `${element.supplier}`},
      { columnDef: 'sub_total', header: 'Sub Total', cell: (element: any) => `${element.sub_total}`},
      { columnDef: 'discount', header: 'Discount', cell: (element: any) => `${element.discount}`},
      { columnDef: 'transportation', header: 'Transportation', cell: (element: any) => `${element.transportation}`},
      { columnDef: 'total', header: 'Total', cell: (element: any) => `${element.total}`},
      { columnDef: 'paid', header: 'Paid', cell: (element: any) => `${element.paid}`},
      { columnDef: 'due', header: 'Due', cell: (element: any) => `${element.due}`},
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status}`},
    ]

    this.dataUsers = [
      { 's_no': '1', 'purchase_code': 'cind_0002', 'date':'19/10/2022', 'supplier':'Kamp', 'sub_total':'₹ 1050.00' , 'discount':'₹ 150.00', 'transportation':'₹ 150.00', 'total':'₹ 1050.00', 'paid':'₹ 550.00', 'due':'₹ 500.00', 'status': 'Active'},
      { 's_no': '2', 'purchase_code': 'cind_0001', 'date':'19/10/2022', 'supplier':'Cind', 'sub_total':'₹ 250.00' , 'discount':'₹ 50.00', 'transportation':'₹ 0.00', 'total':'₹ 200.00', 'paid':'₹ 100.00', 'due':'₹ 100.00', 'status': 'Active'},

    ];
    this.productctrl = new FormControl({value: '', disabled: this.disabled})

  }
  buttonClick(e:any){}

  uploadFile() {
    let theEvent = document.createEvent("MouseEvent");
    theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var element: any = document.getElementById('fileUPload');
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
