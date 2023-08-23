import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private inputValueSubject = new BehaviorSubject<string>('');

  constructor(private dialog: MatDialog) { }


  getInputValueObservable() {
    return this.inputValueSubject.asObservable();
  }

  setInputValue(value: string) {
    this.inputValueSubject.next(value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      // Add any other configuration options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
  
}





