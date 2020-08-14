import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[editableFocusable]',
})
export class EditableFocusDirective implements OnInit {
  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
