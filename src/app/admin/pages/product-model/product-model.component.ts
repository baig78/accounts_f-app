import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import { DashboardService } from '../../services/dashboard.service';
import { DashboardService } from '../../services/dashboard.service';
interface retailer {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.scss']
})
export class ProductModelComponent implements OnInit {
  buttons: TableBtn[] | any;
  productModelForm: any = FormGroup;
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
    this.DashboardService.getData("pmodels").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        this.setTable(data)
      },
    });

  }


  createForm() {
    this.productModelForm = this.formBuilder.group({
      'uid': [null, Validators.required],
      'name': [null, Validators.required],
      
    });
  }
  setTable(tableData: any) {

    // this.retailerData = tableData
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];


    this.retailersColumns = ['id', 'uid', 'name', 'edit', 'delete'];
    this.retailerData = tableData;
    this.isTableShow = true;

  }



  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.productModelForm.patchValue({
      uid: data.uid,
      name: data.name,
     
    })
    this.editId=data.id
    //do something
  }
  deleteItem(data:any) {
    this.dele(data.id)
    console.log(data)
    //do something
}

  add() {
    this.productModelForm
    let apiurl = "insert_product_models";
    let data = {
      uid: this.productModelForm.controls.uid.value,
      name: this.productModelForm.controls.name.value,
      

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
    this.productModelForm
    let apiurl = "edit_pmodels";
    let data = {
      // id: 0,
      uid: this.productModelForm.controls.uid.value,
      name: this.productModelForm.controls.name.value,
      
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

  dele(id:any){
    let apiurl = "delete_product_model";

    this.DashboardService.deleteData(apiurl,id).subscribe({
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
