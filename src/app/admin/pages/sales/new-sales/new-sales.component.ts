import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.scss']
})
export class NewSalesComponent implements OnInit {
  
  billsForm: any = FormGroup;
  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'invoiceNo': [null, Validators.required],
      'retailerId': [null, Validators.required],
      'customerName': [null, Validators.required],
      'date': [null, Validators.required],
      'balance': [null, Validators.required],
      'total': [null, Validators.required],
      'balanceDueDate': [null, Validators.required],
      'updatedDate': [null, Validators.required],
      'insertDate': [null, Validators.required],
      'updateDate': [null, Validators.required],
      'generateOtp': [null, Validators.required],
      'otpStatus': [null, Validators.required],
      'insertUserId': [null, Validators.required],
      'updateUserId': [null, Validators.required],

    });
  }
  

  constructor(
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.createBillForm()
  }

  myFilter(d: Date): boolean {
		const day = d.getDay();
    const month = d.getMonth();
		const todays_date = d.getDate();
		const todaysDateObject = new Date();
		const today = todaysDateObject.getDate();
    const actualMonth = todaysDateObject.getMonth();
    console.log(todays_date)

    	/** Prevent actual system date from being selected.*/
    if (month === actualMonth && todays_date === today) {
      return false;
    } else if (day !== 0 && day !== 6) {
      return true;
    } else {
      return false;
    }

		/** Prevent Saturday, Sunda.*/
//		return day !== 0 && day !== 6;
	}

}
