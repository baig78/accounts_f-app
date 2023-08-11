import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.scss']
})
export class NewSalesComponent implements OnInit {
  selectedDate: Date = new Date();
  date = new FormControl();
  errorMessage: string = '';


  formData = {
    taxType: 'sales',
    tax: '',
    discountType: 'fixed',
    discount: ''
  };

  
  billsForm: any = FormGroup;
  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'invoiceNo': [null, Validators.required],
      'retailerId': [null, Validators.required],
      'customerName': [null, Validators.required],
      'date': [null, Validators.required],


    });
  }


  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog

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








  dataSource = new MatTableDataSource<Person>([
    // { name: 'John', age: 25 },
    // { name: 'Jane', age: 30 }
  ]);

  displayedColumns: string[] = ['description', 'quantity', 'unitPrice', 'discount', 'taxAmount', 'totalAmount', 'actions'];

  validateInputFields(): boolean {
    // Iterate through your data source.data and check if any input fields are empty
    for (const element of this.dataSource.data) {
      if (!element.description || !element.quantity) {
        return false;
      }
    }
    return true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Display duration in milliseconds
    });
  }

  deleteRow(row: Person) {
    const index = this.dataSource.data.indexOf(row);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.openSnackBar('Row deleted!', 'Undo');
    }
  }


  addRow() {
    if (this.validateInputFields()) {
      const newRow: Person = { description: '', quantity: 1, unitPrice: 1.00, discount: 0, taxAmount: 0, totalAmount: 0 };
      this.dataSource.data.push(newRow);
      this.dataSource._updateChangeSubscription();
      this.openSnackBar('New row added!', 'Close');
    } else {
      this.openSnackBar('Please fill all fields.', 'Got it');
    }
  }
  saveRow(row: Person) {
    // Here you can perform the logic to save the specific row's data, for example, send it to an API.
    console.log('Saving:', row);
  }

  incrementQuantity(row: Person) {
    row.quantity += 1;
  }

  decrementQuantity(row: Person) {
    if (row.quantity > 0) {
      row.quantity -= 1;
    }
  }

  openPopup(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: '400px', // Adjust the width as needed
    });
  }

  saveForm() {
    // Perform form submission and save logic here
    console.log('Form data:', this.formData);
  }

  onSubmit() {
    if (!this.formData.tax || !this.formData.discount) {
      // Handle form validation errors
      return;
    }

    // Perform form submission and save logic here
    console.log('Form data submitted:', this.formData);

    // Close the popup after submitting the form
    this.dialog.closeAll();
  }

  

}
export interface Person {
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
}
