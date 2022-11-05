import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../admin/services/dashboard.service';

interface user {
  value: string;
  viewValue: string;
}

interface account {
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
  usersForm: any = FormGroup;
  isTableShow: boolean = false;


  usersData: MatTableDataSource<UserData> | any;
  usersColumns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;

  
  users: user[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];
  accountType: user[] = [
    { value: 'generalUser', viewValue: 'General User' },
    { value: 'admin', viewValue: 'Admin' },
  ];
  constructor(
    public DashboardService: DashboardService,

    private formBuilder: FormBuilder

  ) {
   this.getAllTableData()

  }

  ngOnInit(): void {
    this.createUserForm();


  }

  getAllTableData(){
    this.DashboardService.getData("users").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)

        this.setTable(data.results)
      },
    });
  }

  createUserForm() {
    this.usersForm = this.formBuilder.group({
      'userName': [null, Validators.required],
      'emailAddress': [null, Validators.required],
      'password': [null, Validators.required],
      'confirmPassword': [null, Validators.required],
      'accountType': [null, Validators.required],
      'status': [null, Validators.required],
      'designation': [null, Validators.required],

    });
  }

  setTable(tableData: any) {

    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    
    this.usersColumns = ['id','name','user_name','password','phone','email', 'edit', 'delete'];
    this.usersData = tableData;
    this.isTableShow = true;

  }


  buttonClick(e: any) { }
  uploadFile() { }

  add() {
    this.usersForm
    let apiurl = "insert_users";
    let data = {
      // id: 0,
      name: this.usersForm.controls.companyName.value,
      email: this.usersForm.controls.emailAddress.value,
      phone: this.usersForm.controls.phoneNumber.value,
      alt_phone: this.usersForm.controls.altNumber.value,
      company_name: this.usersForm.controls.companyName.value,
      city: this.usersForm.controls.city.value,
      address: this.usersForm.controls.address.value,
      gst_no: this.usersForm.controls.gstNo.value,
 
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
