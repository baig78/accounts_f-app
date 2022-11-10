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
  isExpand: boolean = false;


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
  editId: any;
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
  gotoItem(data:any) {
    this.isExpand = true;

    console.log(data)
    this.supplierForm.patchValue({
      companyName: data.company_name,
      emailAddress: data.email,
      phoneNumber: data.phone,
      altNumber: data.alt_phone,
      ownerName: data.name,
      address: data.address,
      city: data.city,
      gstNo: data.gst_no,
    })
    this.editId=data.id
    //do something
}
  deleteItem(data:any) {
    this.dele(data.id)
    console.log(data)
    //do something
}
  setTable(tableData: any) {

    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

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
        this.isExpand = false;

      },
      
    });

  }

  edit() {
    this.supplierForm
    let apiurl = "edit_mfr";
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
      id: this.editId
 
    };
    this.DashboardService.editData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        this.setTable(data.results)
        this.getAllTableData()
      },
      
    });

  }

  dele(id:any){
    let apiurl = "delete_mfr";

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

    }
  
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
