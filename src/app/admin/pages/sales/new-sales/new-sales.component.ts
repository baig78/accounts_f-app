import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/admin/shared/dialog.service';
import { DashboardService } from '../../../services/dashboard.service';

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
  selectedAmount: number = 0;
  selectedCharge: string = '5%';
  calculatedValue: number = 0;
  selectedDiscountAmount: number = 0;
  selectedDiscount: string = '5%';
  calculatedDiscountValue: number = 0;
  billsForm: any = FormGroup;
  ddlCompanies: any = []

  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'invoiceNo': [null, Validators.required],
      'retailerId': [],
      'customerName': [null, Validators.required],
      'date': [null, Validators.required],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    // private dialog: MatDialog
    private dialogService: DialogService,
    public DashboardService: DashboardService,
  ) {
    this.dataSource = new MatTableDataSource<Person>([
      // Initialize your data source here
    ]);
  }

  openDialog(): void {
    this.dialogService.openDialog();
  }

  ngOnInit(): void {
    this.getSalesTableData();
    this.getAllTableData();
    this.createBillForm();
    this.dialogService.getInputValueObservable().subscribe((value) => {
      this.discount = value;
    });
  }

  getAllTableData() {
    this.DashboardService.getData("rtr").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        data.forEach((item: any) => {
          this.ddlCompanies.push({ label: item?.company_name, value: item?.company_name })
        });
      },
    });
  }

  otherCharges: { label: string, value: string }[] = [
    { label: '5%', value: '5%' },
    { label: '10%', value: '10%' },
    { label: '15%', value: '15%' },
    { label: 'fixed', value: 'fixed' },
  ];

  discountAll: { label: string, value: string }[] = [
    { label: '5%', value: '5%' },
    { label: '10%', value: '10%' },
    { label: '15%', value: '15%' },
    { label: 'fixed', value: 'fixed' },
  ];

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

  dataSource = new MatTableDataSource<Person>([]);

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
      const newRow: Person = { description: '', quantity: 1, unitPrice: 0, discount: 0, taxAmount: 0, totalAmount: 0 };
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

  saveData() {
    // const formValues = this.billsForm.value;
    // const logMessage = `
    //   Form Values: ${JSON.stringify(formValues)}
    //   Calculated Value: ${this.calculatedValue}
    //   Calculated Discount Value: ${this.calculatedDiscountValue}
    //   Selected Amount: ${this.selectedAmount}
    //   Selected Charge: ${this.selectedCharge}
    //   Selected Discount Amount: ${this.selectedDiscountAmount}
    //   Selected Discount: ${this.selectedDiscount}
    //   Calculated Grand Total: ${this.calculateGrandTotal()}
    // `;
    // console.log(logMessage);


    this.billsForm
    let apiurl = "insert_new_sale";
    let data = {
      customerName: this.billsForm.controls.companyName.value,
      // email: this.retailersForm.controls.emailAddress.value,
      // phone: this.retailersForm.controls.phoneNumber.value,
      // mobile: this.retailersForm.controls.altNumber.value,
      // name: this.retailersForm.controls.ownerName.value,
      // city: this.retailersForm.controls.city.value,
      // address: this.retailersForm.controls.address.value,
      // gst_no: this.retailersForm.controls.gstNo.value,
      // country: this.retailersForm.controls.country.value,
      // postal_code: this.retailersForm.controls.postalCode.value,

    };
    this.DashboardService.insertData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data.results)
        // this.setTable(data.results)
        // this.getAllTableData()
        // this.isExpand = false;

      },
    });
  }

  getSalesTableData() {
    this.DashboardService.getData("get_new_sale").subscribe({
      error: (err: any) => { },
      next: (data: any) => {
        console.log(data)

        // this.setTable(data)
      },
    });

  }

  calculateTotalAmount(element: any): number {
    var a = ((element.quantity * element.unitPrice) - element.discount);
    var b = parseInt(element.taxAmount);
    return (a) + (b);
  }

  calculateTotalQuantity(): number {
    let totalQuantity = 0;
    for (const element of this.dataSource.data) {
      const quantityAsString = String(element.quantity);
      totalQuantity += parseInt(quantityAsString) || 0;
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

  calculateOtherCharges() {
    const amount = parseFloat(this.selectedAmount.toString()); // Convert to number
    if (this.selectedCharge === 'fixed') {
      // Calculate only based on selectedAmount when the fixed charge is selected
      this.calculatedValue = amount;
    } else {
      const percentage = parseFloat(this.selectedCharge.toString()); // Already a number (percentage)
      // Perform the calculation: ((amount * percentage) / 100) + amount
      this.calculatedValue = ((amount * percentage) / 100) + amount;
    }
  }

  calculateDiscount() {
    const amount = parseFloat(this.selectedDiscountAmount.toString()); // Convert to number
    if (this.selectedDiscount === 'fixed') {
      // Calculate only based on selectedDiscountAmount when the fixed charge is selected
      this.calculatedDiscountValue = amount;
    } else {
      const percentage = parseFloat(this.selectedDiscount.toString()); // Already a number (percentage)
      // Perform the calculation: ((amount * percentage) / 100) + amount
      this.calculatedDiscountValue = ((amount * percentage) / 100) + amount;
    }
  }

  calculateGrandTotal(): number {
    const subTotal = this.calculateSubTotal();
    const grandTotal = subTotal + this.calculatedValue - this.calculatedDiscountValue;
    return grandTotal;
  }

  cancel() {

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
