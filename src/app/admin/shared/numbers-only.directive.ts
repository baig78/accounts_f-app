import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    if (allowedKeys.includes(event.key) ||
        /^[0-9]+$/.test(event.key)) {
      return;
    }

    event.preventDefault();
  }
}
