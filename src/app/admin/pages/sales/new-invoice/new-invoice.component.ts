import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../services/dashboard.service';


interface customer {
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
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
  isTableShow: boolean = false;
  billsColumns: TableColumn | any;
  billsData: MatTableDataSource<UserData> | any;

  billsForm: any = FormGroup;

  productctrl!: FormControl;
  disabled: boolean = true;
  buttons: TableBtn[] | any;
  date = new FormControl(new Date());
  customers: customer[] = [
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
  isExpand: boolean =false;
  editId: any;
  mySearch:any;
  apiData: any = [];
  constructor(
    public DashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) { 
    this.getAllTableData()

  }

  ngOnInit(): void {
    this.createBillForm();
    

  }
  getAllTableData() {
    this.DashboardService.getData("bills").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)
        this.apiData= data;
        this.setTable(data)
      },
    });
  }

  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'invoiceNo': [null, Validators.required],
      'retailerId': [null, Validators.required],
      'quantity': [null, Validators.required],
      'description': [null],
      'advance': [null, Validators.required],
      'balance': [null, Validators.required],
      'total': [null, Validators.required],
      'balanceDueDate': [null, Validators.required],
      'updatedDate': [null, Validators.required],
      'insertDate': [null, Validators.required],
      'updateDate': [null, Validators.required],
      'generateOtp': [null, Validators.required],
      'otpStatus': [null, Validators.required],
      'insertUserId': [null, Validators.required],
      'updateUserId': [null, Validators.required],

    });
  }
  setTable(tableData: any) {
    

    this.billsColumns = ['id', 'invoice_no', 'prd_batch_uid', 'rtr_id', 'qty', 'desc', 'advance', 'balance', 'total', 'balance_due_date', 'insert_date', 'updated_date', 'gen_otp', 'otp_status', 'insert_user_id', 'update_user_id', 'edit', 'delete'];

    console.log('---------', tableData)
 
    this.billsData = tableData;
    this.isTableShow = true;
  }
  onSearch(e:any){
    console.log('----',e.target.value)
    // this.setTable(this.apiData.find((x:any)=>x.include(e.target.value)))
    this.apiData.find((x:any)=>{x.description==e.target.value})
    this.setTable(this.apiData.find((x:any)=>{x.description==e.target.value}))
    console.log('----',this.apiData.find((x:any)=>{x.description==e.target.value}))


  }
  
  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.billsForm.patchValue({
      invoiceNo: data.invoice_no,
      prdBatchUid: data.prd_batch_uid,
      retailerId: data.rtr_id,
      quantity: data.qty,
      description: data.description,
      advance: data.advance,
      balance: data.balance,
      total: data.total,
      balanceDueDate: data.balance_due_date,
      insertDate: data.insert_date,
      updateDate: data.updated_date,
      generateOtp: data.gen_otp,
      otpStatus: data.otp_status,
      insertUserId: data.insert_user_id,
      updateUserId: data.update_user_id,
    })
    this.editId=data.id
  }
  deleteItem(data: any) {
    this.dele(data.id)
    console.log(data)
    this.getAllTableData()

  }

  // uploadFile() {
  //   let theEvent = document.createEvent("MouseEvent");
  //   theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  //   var element: any = document.getElementById('fileUPload');
  //   element.dispatchEvent(theEvent);
  // }

  add() {
    this.billsForm
    let apiurl = "insert_bill";
    let data = {
      // id: 0,
      invoice_no: this.billsForm.controls.invoiceNo.value,
      prd_batch_uid: this.billsForm.controls.retailerId.value,
      rtr_id: this.billsForm.controls.quantity.value,
      qty: this.billsForm.controls.quantity.value,
      description: this.billsForm.controls.description.value,
      advance: this.billsForm.controls.advance.value,
      balance: this.billsForm.controls.balance.value,
      total: this.billsForm.controls.total.value,
      balance_due_date: this.billsForm.controls.balanceDueDate.value,
      insert_date: this.billsForm.controls.insertDate.value,
      updated_date: this.billsForm.controls.updateDate.value,
      gen_otp: this.billsForm.controls.generateOtp.value,
      otp_status: this.billsForm.controls.otpStatus.value,
      insert_user_id: this.billsForm.controls.insertUserId.value,
      update_user_id: this.billsForm.controls.updateUserId.value,

    };
    this.DashboardService.insertData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
        this.isExpand = false;

      },

    });

  }
  edit() {
    this.billsForm
    let apiurl = "edit_bill";
    let data = {
      id: this.editId,
      invoice_no: this.billsForm.controls.invoiceNo.value,
      prd_batch_uid: this.billsForm.controls.retailerId.value,
      rtr_id: this.billsForm.controls.quantity.value,
      qty: this.billsForm.controls.quantity.value,
      description: this.billsForm.controls.description.value,
      advance: this.billsForm.controls.advance.value,
      balance: this.billsForm.controls.balance.value,
      total: this.billsForm.controls.total.value,
      balance_due_date: this.billsForm.controls.balanceDueDate.value,
      insert_date: this.billsForm.controls.insertDate.value,
      updated_date: this.billsForm.controls.updateDate.value,
      gen_otp: this.billsForm.controls.generateOtp.value,
      otp_status: this.billsForm.controls.otpStatus.value,
      insert_user_id: this.billsForm.controls.insertUserId.value,
      update_user_id: this.billsForm.controls.updateUserId.value,

    };
    this.DashboardService.editData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
        this.isExpand = false;

      },

    });

  }

  dele(id: any) {
    let apiurl = "delete_bill";

    this.DashboardService.deleteData(apiurl, id).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
      },

    });

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
