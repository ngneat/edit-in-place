import { Directive, inject } from '@angular/core';
import { EditableGroupDirective } from './editable-group.directive';

@Directive({
  selector: '[]',
  standalone: true,
})
export class EditableGroupActionDirective {
  protected group = inject(EditableGroupDirective);
}
