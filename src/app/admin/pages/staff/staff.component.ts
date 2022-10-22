import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
interface staff {
  value: string;
  viewValue: string;
}
import { DashboardService } from '../../../admin/services/dashboard.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
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
      { columnDef: 'profile_picture', header: 'Profile Picture', cell: (element: any) => `${element.profile_picture}` },
      { columnDef: 'employee_name', header: 'Employee Name', cell: (element: any) => `${element.employee_name}` },
      { columnDef: 'employee_email', header: 'Employee Email', cell: (element: any) => `${element.employee_email}`},
      { columnDef: 'phone_number', header: 'Phone Number', cell: (element: any) => `${element.phone_number}`},
      { columnDef: 'department', header: 'Department', cell: (element: any) => `${element.department}`},
      { columnDef: 'designation', header: 'Designation', cell: (element: any) => `${element.designation}`},
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element.status}`},
      { columnDef: 'created_on', header: 'Created On', cell: (element: any) => `${element.created_on}`},

    ]

    this.dataCrops = [
      {
      'profile_picture': 'Naresh',
      'employee_name': 'Naresh',
      'employee_email':'naresh@gmail.com',
      'phone_number':'7799937299',
      'department':'asdf',
      'designation': 'def',
      'status' : 'Active',
      'created_on' : '13/10/2022',
    },

      {
      'profile_picture': 'Naimath',
      'employee_name': 'Naimath',
      'employee_email':'naimath@gmail.com',
      'phone_number':'7799937299',
      'department':'asdf',
      'designation': 'def',
      'status' : 'Active',
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
