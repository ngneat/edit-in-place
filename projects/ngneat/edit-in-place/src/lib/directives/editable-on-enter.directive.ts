import { Directive, HostListener, inject } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Directive({
  selector: '[editableOnEnter]',
  standalone: true,
})
export class EditableOnEnterDirective {
  #editable = inject(EditableComponent);

  @HostListener('keyup.enter')
  onEnter(): void {
    this.#editable.saveEdit();
  }
}
