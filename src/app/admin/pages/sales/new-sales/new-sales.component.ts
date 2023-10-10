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

  inputOtherCharges: number = 0;
  selectedOtherCharge: string = '5%';
  CalculateOtherChargesValue: number = 0;

  inputDiscountAmount: number = 0;
  selectedDiscount: string = '5%';
  calculatedDiscountValue: number = 0;
  
  billsForm: any = FormGroup;
  ddlCompanies: any = []
  tableFileds: any = [];

  domain: string = '';
  invalidDomain: boolean = false;
  validateDomain(value: string) {
    // Define a regular expression pattern for validation
    const validDomainPattern = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;



    // Test if the input matches the pattern
    if (validDomainPattern.test(value)) {
      this.invalidDomain = false;
    } else {
      this.invalidDomain = true;
    }
  }

  createBillForm() {
    this.billsForm = this.formBuilder.group({
      'invoiceNo': [null, Validators.required],
      'retailerId': [],
      'companyName': [null, Validators.required],
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
  myTblFomData(i: any, fieldName: any, event: any) {
    console.log(i, fieldName, event.value, '---------000000');
    if (this.tableFileds.length < (i + 1)) {
      this.tableFileds[i] = { quantity: '', unitPrice: '', description: '', discount: '', taxAmount: '', totalAmount: '' };
    }
    this.tableFileds[i][fieldName] = event.value;
  }
  // saveData() {
  //   this.billsForm
  //   let apiurl = "insert_new_sale";
  //   let data = {
  //     companyName: this.billsForm.controls.companyName.value,
  //     date: this.billsForm.controls.date.value,
  //     invoice_no_id: this.billsForm.controls.invoiceNo.value,
  //     reference_no: this.billsForm.controls.retailerId.value,
  //   };
  //   this.calculateOtherCharges();
  //   this.calculateDiscount();
  //   this.calculateGrandTotal();
  //   const grandTotal = this.calculateGrandTotal();
  //   console.log(data, '----------dfdfh', this.tableFileds)
  //   console.log(this.CalculateOtherCharges, '--ssssssssssssssssssssssssssssssssssssssssssssssssss')
  //   console.log(this.calculatedDiscountValue, 'disct')
  //   console.log('Selected Discount:', this.selectedDiscount);
  //   console.log('Grand Total in saveData():', grandTotal);


  //   this.DashboardService.insertData(apiurl, data).subscribe({
  //     error: (err: any) => { },
  //     next: (data: any) => {
  //       console.log(data.results)
  //       console.log(data, '----------dfdfh', this.tableFileds)
  //       console.log(this.CalculateOtherCharges, '--ssssssssssssssssssssssssssssssssssssssssssssssssss')
  //       console.log(this.calculatedDiscountValue, 'disct')
  //       console.log('Selected Discount:', this.selectedDiscount);
  //       console.log('Grand Total in saveData():', grandTotal);
  //     },
  //   });
  // }



  // saveData() {
  //   const tableData = this.dataSource.data;
  //   const calculatedGrandTotal = this.calculateGrandTotal();
    
  //   // Assuming this.billsForm is an Angular FormGroup or FormArray
  //   let apiurl = "insert_new_sale";
  //   // Initialize empty arrays for table data fields
  //   const descriptionArray: string[] = [];
  //   const quantityArray: number[] = [];
  //   const unitPriceArray: number[] = [];
  //   const discountArray: number[] = [];
  //   const taxAmountArray: number[] = [];
  //   const totalAmountArray: number[] = [];

  //   // Loop through the dataSource and extract data
  //   this.dataSource.data.forEach(element => {
  //     descriptionArray.push(element.description);
  //     quantityArray.push(element.quantity);
  //     unitPriceArray.push(element.unitPrice);
  //     discountArray.push(element.discount);
  //     taxAmountArray.push(element.taxAmount);
  //     totalAmountArray.push(this.calculateTotalAmount(element));
  //   });
  //   let data = {
  //     company_name: this.billsForm.controls.companyName.value,
  //     date: this.billsForm.controls.date.value,
  //     invoice_no: this.billsForm.controls.invoiceNo.value,
  //     reference_no: this.billsForm.controls.retailerId.value,
  //     // Include table data fields directly in the payload
  //     description: descriptionArray,
  //     quantity: quantityArray,
  //     unit_price: unitPriceArray,
  //     discount: discountArray,
  //     tax_amount: taxAmountArray,
  //     total_amount: totalAmountArray,

  //     other_charges: this.inputOtherCharges,
  //     other_charges_selected: this.selectedOtherCharge,
  //     other_charges_total: this.CalculateOtherChargesValue,
  //     discount_all: this.inputDiscountAmount,
  //     discount_all_selected: this.selectedDiscount,
  //     discount_all_Total: this.calculatedDiscountValue,
  //     grandTotal: calculatedGrandTotal,
      

  //   };

  //   console.log('Other Charges:', this.otherCharges);

  //   // Calculate other charges, discount, and grand total
  //   this.calculateOtherCharges();
  //   this.calculateDiscount();
  //   const grandTotal = this.calculateGrandTotal();

  //   // Include grandTotal in the data object
  //   // data.grandTotal = grandTotal;

  //   // Debugging console.log statements
  //   console.log(data, '----------dfdfh', this.tableFileds);
  //   console.log(this.CalculateOtherChargesValue, '--ssssssssssssssssssssssssssssssssssssssssssssssssss');
  //   console.log(this.calculatedDiscountValue, 'disct');
  //   console.log('Selected Discount:', this.selectedDiscount);
  //   console.log('Grand Total in saveData():', grandTotal);

  //   // Send the data to the service
  //   this.DashboardService.insertData(apiurl, data).subscribe({
  //     error: (err: any) => { },
  //     next: (response: any) => {
  //       // Handle the response as needed
  //       console.log(response.results);
  //     },
  //   });
  // }


  saveData() {
    const tableData = this.dataSource.data;
    const calculatedGrandTotal = this.calculateGrandTotal();
    
    // Assuming this.billsForm is an Angular FormGroup or FormArray
    let apiurl = "insert_new_sale";
    
    // Initialize an empty array to store all the rows of data
    const dataArray: any[] = [];
  
    // Loop through the dataSource and extract data
    this.dataSource.data.forEach(element => {
      const rowData = {
        description: element.description,
        quantity: element.quantity,
        unit_price: element.unitPrice,
        discount: element.discount,
        tax_amount: element.taxAmount,
        total_amount: this.calculateTotalAmount(element),
      };
      dataArray.push(rowData);
    });
  
    let data = {
      company_name: this.billsForm.controls.companyName.value,
      date: this.billsForm.controls.date.value,
      invoice_no: this.billsForm.controls.invoiceNo.value,
      reference_no: this.billsForm.controls.retailerId.value,
      // Include the array of row data in the payload
      table_data: dataArray,
      other_charges: this.inputOtherCharges,
      other_charges_selected: this.selectedOtherCharge,
      other_charges_total: this.CalculateOtherChargesValue,
      discount_all: this.inputDiscountAmount,
      discount_all_selected: this.selectedDiscount,
      discount_all_Total: this.calculatedDiscountValue,
      grandTotal: calculatedGrandTotal,
    };
  
    console.log('Other Charges:', this.otherCharges);
  
    // Calculate other charges, discount, and grand total
    this.calculateOtherCharges();
    this.calculateDiscount();
    const grandTotal = this.calculateGrandTotal();
  
    // Debugging console.log statements
    console.log(data, '----------dfdfh', this.tableFileds);
    console.log(this.CalculateOtherChargesValue, '--ssssssssssssssssssssssssssssssssssssssssssssssssss');
    console.log(this.calculatedDiscountValue, 'disct');
    console.log('Selected Discount:', this.selectedDiscount);
    console.log('Grand Total in saveData():', grandTotal);
  
    // Send the data to the service
    this.DashboardService.insertData(apiurl, data).subscribe({
      error: (err: any) => { },
      next: (response: any) => {
        // Handle the response as needed
        console.log(response.results);
      },
    });
  }
  
  



  // setTable(tableData: any) {




  //   this.billsForm = [ 'companyName', 'date', 'invoice_no', 'reference_no'];
  //   this.dataSource = tableData;
  //   // this.isTableShow = true;

  // }

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

  // calculateOtherCharges() {

  //   const amount = parseFloat(this.inputOtherCharges.toString()); // Convert to number
  //   if (this.selectedOtherCharge === 'fixed') {
  //     // Calculate only based on inputOtherCharges when the fixed charge is selected
  //     this.CalculateOtherCharges = amount;
  //   } else {
  //     const percentage = parseFloat(this.selectedOtherCharge.toString()); // Already a number (percentage)
  //     // Perform the calculation: ((amount * percentage) / 100) + amount
  //     this.CalculateOtherCharges = ((amount * percentage) / 100) + amount;

  //   }

  // }
  calculateOtherCharges() {
    const amount = parseFloat(this.inputOtherCharges.toString()); // Convert to number
    if (this.selectedOtherCharge === 'fixed') {
      // Calculate only based on inputOtherCharges when the fixed charge is selected
      this.CalculateOtherChargesValue = amount;
    } else {
      const percentage = parseFloat(this.selectedOtherCharge.toString()); // Already a number (percentage)
      // Perform the calculation: ((amount * percentage) / 100) + amount
      this.CalculateOtherChargesValue = ((amount * percentage) / 100) + amount;
    }

    // Log the calculated value to the console
    console.log('Calculate other changes:', this.CalculateOtherChargesValue);
  }




  calculateDiscount() {
    const amount = parseFloat(this.inputDiscountAmount.toString()); // Convert to number
    if (this.selectedDiscount === 'fixed') {
      // Calculate only based on inputDiscountAmount when the fixed charge is selected
      this.calculatedDiscountValue = amount;
    } else {
      const percentage = parseFloat(this.selectedDiscount.toString()); // Already a number (percentage)
      // Perform the calculation: ((amount * percentage) / 100) + amount
      this.calculatedDiscountValue = ((amount * percentage) / 100) + amount;
    }
    // console.log('Discount Value:', this.calculatedDiscountValue);

  }

  calculateGrandTotal(): number {
    const subTotal = this.calculateSubTotal();
    const grandTotal = subTotal + this.CalculateOtherChargesValue - this.calculatedDiscountValue;
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
