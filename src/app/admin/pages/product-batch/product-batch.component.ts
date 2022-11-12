import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-batch',
  templateUrl: './product-batch.component.html',
  styleUrls: ['./product-batch.component.scss']
})
export class ProductBatchComponent implements OnInit {
  productBatchForm: any = FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
