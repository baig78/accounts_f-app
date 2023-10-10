import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import { DashboardService } from '../../services/dashboard.service';
import { DashboardService } from '../../../services/dashboard.service';
interface retailer {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.scss']
})
export class RetailersComponent implements OnInit {
  buttons: TableBtn[] | any;
  retailersForm: any = FormGroup;
  isTableShow: boolean = false;

  isExpand: boolean = false;

  retailerData: MatTableDataSource<UserData> | any;
  retailersColumns: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;
  retailers: retailer[] = [
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
  getAllTableData() {
    this.DashboardService.getData("rtr").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        this.setTable(data)
      },
    });

  }


  createForm() {
    this.retailersForm = this.formBuilder.group({
      'companyName': [null, Validators.required],
      'emailAddress': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'altNumber': [''],
      'ownerName': [null, Validators.required],
      'address': [null, Validators.required],
      'city': [null, Validators.required],
      'status': [null, Validators.required],
      'gstNo': [null, Validators.required],
      'postalCode': [null, Validators.required],
      'country': [null, Validators.required],
    });
  }
  setTable(tableData: any) {

    // this.retailerData = tableData
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];


    this.retailersColumns = ['id', 'company_name', 'name', 'mobile', 'phone', 'email', 'country', 'address', 'city', 'postal_code', 'gst_no', 'edit', 'delete'];
    this.retailerData = tableData;
    this.isTableShow = true;

  }

  uploadFile() { }

  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.retailersForm.patchValue({
      ownerName: data.name,
      companyName: data.company_name,
      address: data.address,
      country: data.country,
      city: data.city,
      phoneNumber: data.phone,
      altNumber: data.mobile,
      emailAddress: data.email,
      gstNo: data.gst_no,
      postalCode: data.postal_code,
    })
    this.editId = data.id
  }
  deleteItem(data: any) {
    this.dele(data.id)
    console.log(data)
  }

  add() {
    this.retailersForm
    let apiurl = "insert_retailers";
    let data = {
      company_name: this.retailersForm.controls.companyName.value,
      email: this.retailersForm.controls.emailAddress.value,
      phone: this.retailersForm.controls.phoneNumber.value,
      mobile: this.retailersForm.controls.altNumber.value,
      name: this.retailersForm.controls.ownerName.value,
      city: this.retailersForm.controls.city.value,
      address: this.retailersForm.controls.address.value,
      gst_no: this.retailersForm.controls.gstNo.value,
      country: this.retailersForm.controls.country.value,
      postal_code: this.retailersForm.controls.postalCode.value,

    };
    this.DashboardService.insertData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results, 'rtr---------------')
        this.setTable(data.results)
        this.getAllTableData()
        this.isExpand = false;

      },
    });
  }


  edit() {
    this.retailersForm
    let apiurl = "edit_rtr";
    let data = {
      // id: 0,
      id: this.editId,

      company_name: this.retailersForm.controls.companyName.value,
      email: this.retailersForm.controls.emailAddress.value,
      phone: this.retailersForm.controls.phoneNumber.value,
      mobile: this.retailersForm.controls.altNumber.value,
      name: this.retailersForm.controls.ownerName.value,
      city: this.retailersForm.controls.city.value,
      address: this.retailersForm.controls.address.value,
      gst_no: this.retailersForm.controls.gstNo.value,
      country: this.retailersForm.controls.country.value,
      postal_code: this.retailersForm.controls.postalCode.value,

      // address: this.retailersForm.controls.address.value,

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
    let apiurl = "delete_rtr";

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
