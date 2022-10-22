import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  suppliers: supplier[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'Inactive'},
  ];
  constructor() { }

  ngOnInit(): void {
    this.buttons = [
      { styleClass: 'btn-success', icon: 'delete', payload: (element: UserData) => `${element.id}`, action: 'add' },
      { styleClass: 'btn-primary', icon: 'edit', payload: (element: UserData) => `${element.id}`, action: 'edit' },
    ];

    this.columnsCrops = [
      { columnDef: 'profile_picture', header: 'Profile Picture', cell: (element: any) => `${element.profile_picture}` },
      { columnDef: 'company_name', header: 'Company Name', cell: (element: any) => `${element.company_name}` },
      { columnDef: 'employee_email', header: 'Employee Email', cell: (element: any) => `${element.employee_email}`},
      { columnDef: 'phone_number', header: 'Phone Number', cell: (element: any) => `${element.phone_number}`},
      { columnDef: 'owner_name', header: 'Owner Name', cell: (element: any) => `${element.owner_name}`},
      { columnDef: 'designation', header: 'Designation', cell: (element: any) => `${element.designation}`},
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status}`},
      { columnDef: 'created_on', header: 'Created On', cell: (element: any) => `${element.created_on}`},

    ]

    this.dataCrops = [
      {
      'profile_picture': 'Naresh',
      'company_name': 'Naresh',
      'employee_email':'naresh@gmail.com',
      'phone_number':'7799937299',
      'owner_name':'asdf',
      'designation': 'def',
      'status' : 'Active',
      'created_on' : '13/10/2022',
    },

      {
      'profile_picture': 'Naimath',
      'company_name': 'Naimath',
      'employee_email':'naimath@gmail.com',
      'phone_number':'7799937299',
      'owner_name':'asdf',
      'designation': 'def',
      'status' : 'Active',
      'created_on' : '13/10/2022'

    },
      // { 'crop_name': 'Tamato', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'owner_name':'Tip1' },
      // { 'crop_name': 'Potato', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'owner_name':'Tip1' },
      // { 'crop_name': 'Mango', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'owner_name':'Tip1' },
      // { 'crop_name': 'Grap', 'nutrient_quantities': 'N10,P10,K10', 'prefered_fertilizers':'DAP/MOP/Urea','phone_number':'7799937299', 'owner_name':'Tip1' },

    ];
  }
  buttonClick(e:any){}
  uploadFile(){}
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
