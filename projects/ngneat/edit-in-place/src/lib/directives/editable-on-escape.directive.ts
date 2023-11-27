import {Directive, HostListener, inject} from '@angular/core';
import { EditableComponent } from '../editable.component';

@Directive({
  selector: '[editableOnEscape]',
  standalone: true,
})
export class EditableOnEscapeDirective {
  #editable = inject(EditableComponent);

  @HostListener('keyup.escape')
  onEnter(): void {
    this.#editable.cancelEdit();
  }
}
