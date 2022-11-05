import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../admin/services/dashboard.service';

interface staff {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  buttons: TableBtn[] | any;

  dataCrops: MatTableDataSource<UserData> | any;
  staffData: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  staffForm: any = FormGroup;
  isTableShow: boolean = false;

  staffs: staff[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];
  constructor(
    public DashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {
    this.getAllTableData()
  }

  ngOnInit(): void {
    this.createstaffForm();
  }

  getAllTableData() {
    this.DashboardService.getData("users").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        this.setTable(data)
      },
    });
  }

  createstaffForm() {
    this.staffForm = this.formBuilder.group({
      'employeeName': [null, Validators.required],
      'emailAddress': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'department': [null, Validators.required],
      'designation': [null, Validators.required],
      'address': [null, Validators.required],
      'userName': [null, Validators.required],

    });
  }

  setTable(tableData: any) {
    // this.buttons = [
    //   { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
    //   { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    // ];

    this.staffData = ['id', 'name', 'user_name', 'password', 'phone', 'email', 'edit', 'delete'];

    console.log('---------', tableData)
    this.dataCrops = tableData;
    this.isTableShow = true;
  }

  buttonClick(e: any) { }
  uploadFile() { }
  click() {
    this.DashboardService.setProduct(true);
  }

  insertData() {
    let payload =
    {
      "id": 23,
      "name": this.staffForm.controls['employeeName'].value,
      "user_name": this.staffForm.controls['userName'].value,
      "phone": this.staffForm.controls['phoneNumber'].value,
      "email": this.staffForm.controls['emailAddress'].value,
      "role": this.staffForm.controls['designation'].value,
      "address": this.staffForm.controls['address'].value,
    }

    this.DashboardService.insertData("insert_users", payload).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)

        this.setTable(data.results)
      },
    });
    console.log('-----------yhnun', payload)
  }

  add() {
    this.staffForm
    let apiurl = "insert_users";
    let data = {
      // id: 0,
      name: this.staffForm.controls.companyName.value,
      email: this.staffForm.controls.emailAddress.value,
      phone: this.staffForm.controls.phoneNumber.value,
      alt_phone: this.staffForm.controls.altNumber.value,
      company_name: this.staffForm.controls.companyName.value,
      city: this.staffForm.controls.city.value,
      address: this.staffForm.controls.address.value,
      gst_no: this.staffForm.controls.gstNo.value,

    };
    this.DashboardService.insertData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
      },

    });

  }
  dele(id: any) {
    let apiurl = "delete_user";

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

