import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  PData!: string;
  @Output() childEvent = new EventEmitter();


  onChange(value: any) {
    this.childEvent.emit(value);
  }
  
  @Input() color: string = 'primary';
  @Input() floatLeft: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
