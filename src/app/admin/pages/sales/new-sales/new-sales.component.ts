import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/admin/shared/dialog.service';
// import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.scss']
})
export class NewSalesComponent implements OnInit {
  discount: string = '';
  selectedDate: Date = new Date();
  date = new FormControl();
  errorMessage: string = '';




  
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
    // private dialog: MatDialog
    private dialogService: DialogService

  ) {
    this.dataSource = new MatTableDataSource<Person>([
      // Initialize your data source here
    ]);
   }
  openDialog(): void {
    this.dialogService.openDialog();
  }

  ngOnInit(): void {
    this.createBillForm();
    this.dialogService.getInputValueObservable().subscribe((value) => {
      this.discount = value;
    });
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


  incrementQuantity(row: Person) {
    row.quantity += 1;
  }

  decrementQuantity(row: Person) {
    if (row.quantity > 0) {
      row.quantity -= 1;
    }
  }





  // onSubmit(formData:any) {
  //   if (!this.formData.tax || !this.formData.discount) {
  //     // Handle form validation errors
  //     return;
  //   }

  //   // Perform form submission and save logic here
  //   console.log('Form data submitted:', this.formData);

  //   // Close the popup after submitting the form
  //   this.dialog.closeAll();
  // }

  saveData(){

  }

  // calculateTotalAmount(): number {
  //   let totalAmount = 0;
  
  //   for (let element of this.dataSource.data) {
  //     let quantity = element.quantity || 0;
  //     let unitPrice = element.unitPrice || 0;
  //     let discount = element.discount || 0;
  //     let taxAmount = element.taxAmount || 0;
  
  //     let subTotal = quantity * unitPrice
  //     let discnt = ( discount / 100) * discount
  //     let mainTotal = subTotal - discnt
  //     let taxAmt = taxAmount
  //     let totalAmt = mainTotal + taxAmt
  //     totalAmount += totalAmt;
  //   }
  
  //   return totalAmount;
  // }
  
  calculateTotalAmount(element: any): number {
     var a = ((element.quantity * element.unitPrice) - element.discount); 
    var b =  parseInt(element.taxAmount);
    return (a)+(b);
  }

  calculateTotalQuantity(): number {
    let totalQuantity = 0;

    for (const element of this.dataSource.data) {
        totalQuantity += element.quantity || 0;
    }

    return totalQuantity;
}

calculateSubTotal(): number {
  let subTotal = 0;

  for (const element of this.dataSource.data) {
      // Calculate the total amount using the calculateTotalAmount function
      const totalAmount = this.calculateTotalAmount(element);
      subTotal += totalAmount;
  }

  return subTotal;
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
