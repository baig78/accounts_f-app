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
  selector: 'app-product-batch',
  templateUrl: './product-batch.component.html',
  styleUrls: ['./product-batch.component.scss']
})
export class ProductBatchComponent implements OnInit {
  buttons: TableBtn[] | any;
  productBatchForm: any = FormGroup;
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
    this.DashboardService.getData("pbatch").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        this.setTable(data)
      },
    });

  }


  createForm() {
    this.productBatchForm = this.formBuilder.group({
      'uid': [null, Validators.required],
      'mfr_id': [null, Validators.required],
      'batch': [null, Validators.required],
      'model_uid': [null, Validators.required],
      'color': [null, Validators.required],
      'size': [null, Validators.required],
      'mfr_price': [null, Validators.required],
      'per_comm': [null, Validators.required],
      'mfr_gst': [null, Validators.required],
      'rtr_gst': [null, Validators.required],
      'available': [null, Validators.required],
      'sold': [null, Validators.required],
      
    });
  }
  setTable(tableData: any) {

    // this.retailerData = tableData
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];


    this.retailersColumns = ['id', 'uid', 'mfr_id','batch', 'model_uid', 'color', 'size', 'mfr_price', 'per_comm', 'mfr_gst', 'rtr_gst', 'available', 'sold', 'edit', 'delete'];
    this.retailerData = tableData;
    this.isTableShow = true;

  }



  gotoItem(data: any) {
    this.isExpand = true;
    console.log(data)
    this.productBatchForm.patchValue({
      uid: data.uid,
      mfr_id: data.mfr_id,
      batch: data.batch,
      model_uid: data.model_uid,
      color: data.color,
      size: data.size,
      mfr_price: data.mfr_price,
      per_comm: data.per_comm,
      mfr_gst: data.mfr_gst,
      rtr_gst: data.rtr_gst,
      available: data.available,
      sold: data.sold,
      
     
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
    this.productBatchForm
    let apiurl = "insert_products_batch";
    let data = {
      uid: this.productBatchForm.controls.uid.value,
      mfr_id: this.productBatchForm.controls.mfr_id.value,
      batch: this.productBatchForm.controls.batch.value,
      model_uid: this.productBatchForm.controls.model_uid.value,
      color: this.productBatchForm.controls.color.value,
      size: this.productBatchForm.controls.size.value,
      mfr_price: this.productBatchForm.controls.mfr_price.value,
      per_comm: this.productBatchForm.controls.per_comm.value,
      mfr_gst: this.productBatchForm.controls.mfr_gst.value,
      rtr_gst: this.productBatchForm.controls.rtr_gst.value,
      available: this.productBatchForm.controls.available.value,
      sold: this.productBatchForm.controls.sold.value,
      

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
    this.productBatchForm
    let apiurl = "edit_pbatch";
    let data = {
      // id: 0,
      uid: this.productBatchForm.controls.uid.value,
      mfr_id: this.productBatchForm.controls.mfr_id.value,
      batch: this.productBatchForm.controls.batch.value,
      model_uid: this.productBatchForm.controls.model_uid.value,
      color: this.productBatchForm.controls.color.value,
      size: this.productBatchForm.controls.size.value,
      mfr_price: this.productBatchForm.controls.mfr_price.value,
      per_comm: this.productBatchForm.controls.per_comm.value,
      mfr_gst: this.productBatchForm.controls.mfr_gst.value,
      rtr_gst: this.productBatchForm.controls.rtr_gst.value,
      available: this.productBatchForm.controls.available.value,
      sold: this.productBatchForm.controls.sold.value,
      
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
    let apiurl = "delete_product_batch";

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
