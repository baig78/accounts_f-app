import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl } from '@angular/forms';

import { DashboardService } from '../../services/dashboard.service';
interface staff {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  buttons: TableBtn[] | any;

  dataCrops: any;
  columnsCrops: TableColumn | any;
  totalRides: number = 0;
  footer: string = '';
  totalVolume: number = 0;
  fillerNav: string[] | any;

  toppings = new FormControl('');
  toppingList: string[] = ['7799937299', 'Vegetative Stage', 'Flowering Stage', 'Fruiting Stage', 'Harvesting Stage'];
  toppingList1: string[] = ['Plant Selection', 'Monitoring', 'Site Selection', 'Harvesting','Post Harvesting'];
  fertilizers: string[] = ['DAP/MOP/Urea', 'MOP/SSP/Urea', '10-26-26/DAP/Urea'];
  staffs: staff[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'Inactive'},
  ];
  constructor(
    public DashboardService: DashboardService,

  ) { }

  ngOnInit(): void {
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    this.columnsCrops = [
      { columnDef: 's_no', header: '#', cell: (element: any) => `${element.s_no}` },
      { columnDef: 'category_name', header: 'Name', cell: (element: any) => `${element.category_name}` },
      { columnDef: 'note', header: 'Note', cell: (element: any) => `${element.note}`},
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status}`},
      { columnDef: 'created_on', header: 'Created', cell: (element: any) => `${element.created_on}`},

    ]

    this.dataCrops = [
      {
      's_no': '1',
      'category_name': 'Category Name',
      'note':'note 1',
      'status':'Inactive',
      'created_on':'20/10/2022',
    },

    {
      's_no': '2',
      'category_name': 'Category Name',
      'note':'note2',
      'status':'Active',
      'created_on' : '13/10/2022'

    },
      // { 'crop_name': 'Tamato', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'department':'Tip1' },
      // { 'crop_name': 'Potato', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'department':'Tip1' },
      // { 'crop_name': 'Mango', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'department':'Tip1' },
      // { 'crop_name': 'Grap', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'department':'Tip1' },

    ];
  }
  buttonClick(e:any){}
  uploadFile(){}
  click() {
    this.DashboardService.setProduct(true);
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
