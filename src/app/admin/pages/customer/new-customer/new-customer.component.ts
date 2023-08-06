import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  billsForm: any = FormGroup;
  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'customerName': [null, Validators.required],
      'mobile': [null, Validators.required],
      'telephone': [null, Validators.required],
      'email': [null, Validators.required],
      'gstNumber': [null, Validators.required],
      'taxNumber': [null, Validators.required],
      'country': [null, Validators.required],
      'state': [null, Validators.required],
      'city': [null, Validators.required],
      'postalCode': [null, Validators.required],
      'address': [null, Validators.required],
   

    });
  }

  constructor(
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.createBillForm()

  }
  add(){
    
  }

}
