import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Directive({
  selector: '[editableOnEscape]',
})
export class EditableOnEscapeDirective {
  constructor(private readonly editable: EditableComponent) {}

  @HostListener('keyup.escape')
  onEnter(): void {
    this.editable.cancelEdition();
  }
}
