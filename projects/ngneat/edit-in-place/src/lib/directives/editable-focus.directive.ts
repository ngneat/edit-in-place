import {Directive, ElementRef, inject, OnInit} from '@angular/core';

@Directive({
  selector: '[editableFocusable]',
  standalone: true,
})
export class EditableFocusDirective implements OnInit {
  #el = inject(ElementRef);

  ngOnInit(): void {
    this.#el.nativeElement.focus();
  }
}
