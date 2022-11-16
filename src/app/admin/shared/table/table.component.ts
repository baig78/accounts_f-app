import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { empty } from 'rxjs';
// import * as XLSX from 'xlsx';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @Input() data: any[] = [];
  @Input() columns: any = [];
  @Input() buttons: TableBtn[] = [];
  @Output() buttonClick = new EventEmitter<string[]>();
  @Input() pagination: number[] = [];
  @Input() pageSize: number | any;
  @Input() tableMinWidth: number = 500;
  @Output() onClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: TableColumn[] = [];
  mymodel: any;
  mySearch: any;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild('TABLE') table: ElementRef | any;

  ngOnInit(): void {
    console.log("-1----", this.data)
    console.log("-2----", this.columns)
    this.dataSource = new MatTableDataSource();
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  click(i: any) {
    this.onClick.emit(i)
  }
  click1(i: any) {
    this.deleteClick.emit(i)
  }
  onSearch(e: any) {
    let indexs: any[] = [];
    this.data.find((x: any) => {
      Object.keys(x).forEach(function (key) {
        if(!e){
          
        }else if(e!='' && e!=null && e!=undefined){
          console.log('------e----',e)
          if (("" + (x[key]) + "").toLowerCase().includes(e.toLowerCase()) && !indexs.includes(x.id)) {
            indexs.push(x.id)
          }
        }
      });
    })
    this.dataSource = new MatTableDataSource();
    console.log(indexs);
    let data: any[] = [];
    if(indexs.length>0){
      indexs.find((x: any) => {
        data.push(this.data.find((a: any) => a.id == x))
      })
      this.dataSource = new MatTableDataSource(data);
    }else{
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  ExportTOExcel() {
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, 'TablesSize.xlsx');

  }
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
