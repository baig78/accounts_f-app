import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../admin/services/dashboard.service';

interface staff {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  buttons: TableBtn[] | any;

  staffData: MatTableDataSource<UserData> | any;
  staffColumns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  paymentForm: any = FormGroup;
  isTableShow: boolean = false;

  staffs: staff[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];
  isExpand: boolean = false;
  editId: any;
  constructor(
    public DashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {
    this.getAllTableData()
  }

  ngOnInit(): void {
    this.createpaymentForm();
  }

  getAllTableData() {
    this.DashboardService.getData("payments").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        this.setTable(data)
      },
    });
  }

  createpaymentForm() {
    this.paymentForm = this.formBuilder.group({
      'invoice_no': [null, Validators.required],
      'payment_type': [null, Validators.required],
      'insert_date': [null, Validators.required],
      'updated_date': [null, Validators.required],
      'insert_user_id': [null, Validators.required],
      'update_user_id': [null, Validators.required],

    });
  }

  setTable(tableData: any) {
    
    this.staffColumns = ['id', 'invoice_no', 'payment_type', 'insert_date', 'updated_date', 'insert_user_id', 'update_user_id', 'edit', 'delete'];

    console.log('---------', tableData)

    this.staffData = tableData;
    this.isTableShow = true;
  }

  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.paymentForm.patchValue({
      invoice_no: data.invoice_no,
      payment_type: data.payment_type,
      insert_date: data.insert_date,
      updated_date: data.updated_date,
      insert_user_id: data.insert_user_id,
      update_user_id: data.update_user_id,
    })
    this.editId=data.id
    //do something
  }
  deleteItem(data: any) {
    this.dele(data.id)
    console.log(data)
    this.getAllTableData()

    //do something
  }

  uploadFile() { }
 
  add() {
    this.paymentForm
    let apiurl = "insert_payments";
    let data = {
      invoice_no: this.paymentForm.controls.invoice_no.value,
      payment_type: this.paymentForm.controls.payment_type.value,
      insert_date: this.paymentForm.controls.insert_date.value,
      updated_date: this.paymentForm.controls.updated_date.value,
      insert_user_id: this.paymentForm.controls.insert_user_id.value,
      update_user_id: this.paymentForm.controls.update_user_id.value,

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
    this.paymentForm
    let apiurl = "edit_payment";
    let data = {
      invoice_no: this.paymentForm.controls.invoice_no.value,
      payment_type: this.paymentForm.controls.payment_type.value,
      insert_date: this.paymentForm.controls.insert_date.value,
      updated_date: this.paymentForm.controls.updated_date.value,
      insert_user_id: this.paymentForm.controls.insert_user_id.value,
      update_user_id: this.paymentForm.controls.update_user_id.value,
      id: this.editId
      

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
    let apiurl = "delete_payment";

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

