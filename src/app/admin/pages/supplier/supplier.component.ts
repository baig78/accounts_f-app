import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
interface supplier {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  buttons: TableBtn[] | any;
  supplierForm: any = FormGroup;
  isTableShow: boolean = false;


  supplierData: MatTableDataSource<UserData> | any;
  supplierColumns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  suppliers: supplier[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];
  isTableVisible = false;
  constructor(
    public DashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {
   
    this.getAllTableData()
  }

  ngOnInit(): void {



    this.createForm();


  }
getAllTableData(){
  this.DashboardService.getData("mfr").subscribe({
    error: (err: any) => { },
    next: (data: any) => {
      console.log('------',data)

      this.setTable(data)
    },
  });
}

  createForm() {
    this.supplierForm = this.formBuilder.group({
      'companyName': [null, Validators.required],
      'emailAddress': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'altNumber': [''],
      'ownerName': [null, Validators.required],
      'designation': [null, Validators.required],
      'address': [null, Validators.required],
      'city': [null, Validators.required],
      'status': [null, Validators.required],
      'gstNo': [null, Validators.required],
    });
  }
  setTable(tableData: any) {

    // this.supplierData = tableData
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    // this.supplierColumns = [
    //   { columnDef: 'id', header: 'id', cell: (element: any) => `${element.id}` },
    //   { columnDef: 'name', header: 'name', cell: (element: any) => `${element.name}` },
    //   { columnDef: 'company_name', header: 'company_name', cell: (element: any) => `${element.company_name}`},
    //   { columnDef: 'address', header: 'address', cell: (element: any) => `${element.address}`},
    //   { columnDef: 'city', header: 'city', cell: (element: any) => `${element.city}`},
    //   { columnDef: 'phone', header: 'phone', cell: (element: any) => `${element.phone}`},
    //   { columnDef: 'alt_phone', header: 'alt_phone', cell: (element: any) => `${element.alt_phone}`},
    //   { columnDef: 'email', header: 'email', cell: (element: any) => `${element.email}`},

    // ]
    this.supplierColumns = ['id', 'name', 'email', 'phone', 'alt_phone', 'company_name', 'city', 'address', 'gst_no', 'edit', 'delete'];
    this.supplierData = tableData;
    this.isTableShow = true;

  }

  buttonClick(e: any) { }
  uploadFile() { }

  add() {
    this.supplierForm
    let apiurl = "insert_manufacturers";
    let data = {
      // id: 0,
      name: this.supplierForm.controls.companyName.value,
      email: this.supplierForm.controls.emailAddress.value,
      phone: this.supplierForm.controls.phoneNumber.value,
      alt_phone: this.supplierForm.controls.altNumber.value,
      company_name: this.supplierForm.controls.companyName.value,
      city: this.supplierForm.controls.city.value,
      address: this.supplierForm.controls.address.value,
      gst_no: this.supplierForm.controls.gstNo.value,
 
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

  dele(id:any){
    let apiurl = "delete_user";

    this.DashboardService.deleteData(apiurl,id).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
      },
      
    });

  }
  getDataById(id:any){
    let apiurl = "get_user";

    this.DashboardService.getDataById(apiurl,id).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
      },
      
    });

  }
  
  insertData() {
    let payload =
    {
      "id": 23,
      "name": this.supplierForm.controls['ownerName'].value,
      "email": this.supplierForm.controls['emailAddress'].value,
      "phone": this.supplierForm.controls['phoneNumber'].value,
      "alt_phone": this.supplierForm.controls['altNumber'].value,
      "company_name": this.supplierForm.controls['companyName'].value,
      "city": this.supplierForm.controls['city'].value,
      "address": this.supplierForm.controls['address'].value,
      "gst_no": this.supplierForm.controls['gstNo'].value,
      role: this.supplierForm.controls.accountType.value

      // "status": 0,
    }
    // { name: "Karunakar", company_name: "Gelli treaders", address: "206/3rt, saidabad, hyd", city: "hyd",
    //   phone: "1234567890", alt_phone: "1234567890", email: "sdf@fdg.sdf", gst_no: "1212324"

    // };
    this.DashboardService.insertData("insert_manufacturers", payload).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)

        this.setTable(data.results)
      },
    });
    console.log('-----------yhnun', payload)
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
