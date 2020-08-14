import { Directive } from '@angular/core';
import { EditableGroupDirective } from './editable-group.directive';

@Directive({
  selector: '[]',
})
export class EditableGroupActionDirective {
  constructor(protected readonly group: EditableGroupDirective) {}
}
