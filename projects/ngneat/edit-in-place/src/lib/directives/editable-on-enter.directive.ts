import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Directive({
  selector: '[editableOnEnter]',
})
export class EditableOnEnterDirective {
  constructor(private readonly editable: EditableComponent) {}

  @HostListener('keyup.enter')
  onEnter(): void {
    this.editable.saveEdit();
  }
}
