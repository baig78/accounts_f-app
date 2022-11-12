import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../admin/services/dashboard.service';

interface staff {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  buttons: TableBtn[] | any;

  staffData: MatTableDataSource<UserData> | any;
  staffColumns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  userForm: any = FormGroup;
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
    this.createuserForm();
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

  createuserForm() {
    this.userForm = this.formBuilder.group({
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
    
    this.staffColumns = ['id', 'name', 'user_name', 'password', 'phone', 'email', 'edit', 'delete'];

    console.log('---------', tableData)

    this.staffData = tableData;
    this.isTableShow = true;
  }

  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.userForm.patchValue({
      employeeName: data.name,
      userName: data.user_name,
      emailAddress: data.email,
      phoneNumber: data.phone,
      designation: data.role,
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
 

  // insertData() {
  //   let payload =
  //   {
  //     "id": 23,
  //     "name": this.userForm.controls['employeeName'].value,
  //     "user_name": this.userForm.controls['userName'].value,
  //     "phone": this.userForm.controls['phoneNumber'].value,
  //     "email": this.userForm.controls['emailAddress'].value,
  //     "role": this.userForm.controls['designation'].value,
  //     "address": this.userForm.controls['address'].value,
  //   }

  //   this.DashboardService.insertData("insert_users", payload).subscribe({
  //     error: (err: any) => { },
  //     next: (data: any) => {
  //       console.log(data.results)

  //       this.setTable(data.results)
  //     },
  //   });
  //   console.log('-----------yhnun', payload)
  // }

  add() {
    this.userForm
    let apiurl = "insert_users";
    let data = {
      // id: 0,
      name: this.userForm.controls.employeeName.value,
      user_name: this.userForm.controls.userName.value,
      email: this.userForm.controls.emailAddress.value,
      phone: this.userForm.controls.phoneNumber.value,
      // department: this.userForm.controls.department.value,
      role: this.userForm.controls.designation.value,
      // address: this.userForm.controls.address.value,

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
    this.userForm
    let apiurl = "edit_user";
    let data = {
      // id: 0,
      name: this.userForm.controls.employeeName.value,
      user_name: this.userForm.controls.userName.value,
      email: this.userForm.controls.emailAddress.value,
      phone: this.userForm.controls.phoneNumber.value,
      // department: this.userForm.controls.department.value,
      role: this.userForm.controls.designation.value,
      id: this.editId
      
      // address: this.userForm.controls.address.value,

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

