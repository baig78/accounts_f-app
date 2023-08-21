import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  inputValue: string = '';
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
  displayedColumns: string[] = ['tax', 'discount']; // Adjust these column names based on your table structure

  
  formData = {
    taxType: 'sales',      
    tax: '5',               
    discountType: 'fixed',  
    inputValue: ''            
  };

  constructor(
    private dialog: MatDialog,
    private dialogService:DialogService
    
  ) { }

  ngOnInit(): void {
  }

  close(): void {
  }

  onSubmit(formData:any) {
    if (!this.formData.tax || !this.formData.inputValue) {
      // Handle form validation errors
      return;
    }

    // Update the data source with the new discount data
    const newData = {
      tax: this.formData.tax,
      discount: this.formData.inputValue
    };
    this.dataSource.data.push(newData); // Append the new data

    // Perform form submission and save logic here
    console.log('Form data submitted:', this.formData);

    // Close the popup after submitting the form
    this.dialogService.setInputValue(this.inputValue);
    this.dialog.closeAll();

  }

}
