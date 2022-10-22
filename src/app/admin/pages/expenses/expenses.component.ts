import { Component, OnInit } from '@angular/core';

interface expense {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  buttons: TableBtn[] | any;

  dataUsers: any;
  columnsUsers: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  expense_catagory: expense[] = [
    {value: 'packing', viewValue: 'packing'},
    {value: 'transportation', viewValue: 'Transportation'},
  ];
  constructor() { }

  ngOnInit(): void {
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    this.columnsUsers = [
      { columnDef: 's_no', header: '#', cell: (element: any) => `${element.s_no}` },
      { columnDef: 'reason', header: 'Description', cell: (element: any) => `${element.reason}`},
      { columnDef: 'expense_catagory', header: 'Expense Catagory', cell: (element: any) => `${element.expense_catagory}`},
      { columnDef: 'amount', header: 'Amount', cell: (element: any) => `${element.amount}`},
      { columnDef: 'date', header: 'Date', cell: (element: any) => `${element.date}`},
      { columnDef: 'note', header: 'Note', cell: (element: any) => `${element.note}`},
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status}`},
    ]

    this.dataUsers = [
      { 's_no': '1', 'reason': 'reason....', 'expense_catagory':'packing', 'amount': '₹ 500.00', 'date': '18/10/2022', 'note': 'note 1', 'status': 'Active'},
      { 's_no': '1', 'reason': 'reason...', 'expense_catagory':'Transportaion', 'amount': '₹ 900.00', 'date': '19/10/2022', 'note': 'note 2', 'status': 'Active'},



    ];
  }
  uploadFile() {
    let theEvent = document.createEvent("MouseEvent");
    theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var element: any = document.getElementById('fileUPload');
    element.dispatchEvent(theEvent);
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

