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
      'shopName': [null, Validators.required],
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

    // this.retailerData = tableData
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    // this.retailersColumns = [
    //   { columnDef: 'id', header: 'id', cell: (element: any) => `${element.id}` },
    //   { columnDef: 'name', header: 'name', cell: (element: any) => `${element.name}` },
    //   { columnDef: 'company_name', header: 'company_name', cell: (element: any) => `${element.company_name}`},
    //   { columnDef: 'address', header: 'address', cell: (element: any) => `${element.address}`},
    //   { columnDef: 'city', header: 'city', cell: (element: any) => `${element.city}`},
    //   { columnDef: 'phone', header: 'phone', cell: (element: any) => `${element.phone}`},
    //   { columnDef: 'alt_phone', header: 'alt_phone', cell: (element: any) => `${element.alt_phone}`},
    //   { columnDef: 'email', header: 'email', cell: (element: any) => `${element.email}`},

    // ]
    this.retailersColumns = ['id', 'name', 'email', 'phone', 'alt_phone', 'company_name', 'city', 'address', 'gst_no', 'edit', 'delete'];
    this.retailerData = tableData;
    this.isTableShow = true;

  }

  buttonClick(e: any) { }
  uploadFile() { }

  add() {
    this.retailersForm
    let apiurl = "insert_retailers";
    let data = {
      // id: 0,
      shop_name: this.retailersForm.controls.shopName.value,
      email: this.retailersForm.controls.emailAddress.value,
      phone: this.retailersForm.controls.phoneNumber.value,
      alt_phone: this.retailersForm.controls.altNumber.value,
      name: this.retailersForm.controls.ownerName.value,
      city: this.retailersForm.controls.city.value,
      address: this.retailersForm.controls.address.value,
      gst_no: this.retailersForm.controls.gstNo.value,

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

  insertData() {
    let payload =
    {
      // "id": 23,
      // "name": this.retailersForm.controls['ownerName'].value,
      // "email": this.retailersForm.controls['emailAddress'].value,
      // "phone": this.retailersForm.controls['phoneNumber'].value,
      // "alt_phone": this.retailersForm.controls['altNumber'].value,
      // "company_name": this.retailersForm.controls['companyName'].value,
      // "city": this.retailersForm.controls['city'].value,
      // "address": this.retailersForm.controls['address'].value,
      // "gst_no": this.retailersForm.controls['gstNo'].value,
      // role: this.retailersForm.controls.accountType.value

      // "status": 0,
    }
    // { name: "Karunakar", company_name: "Gelli treaders", address: "206/3rt, saidabad, hyd", city: "hyd",
    //   phone: "1234567890", alt_phone: "1234567890", email: "sdf@fdg.sdf", gst_no: "1212324"

    // };
    this.DashboardService.insertData("insert_retailers", payload).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)

        this.setTable(data.results)
      },
    });
    console.log(payload)
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
