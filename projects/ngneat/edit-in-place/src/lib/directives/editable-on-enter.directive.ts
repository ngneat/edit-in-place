import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Directive({
  selector: '[editableOnEnter]',
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableComponent) {}

  @HostListener('keyup.enter')
  onEnter(): void {
    this.editable.updateEdition();
  }
}
