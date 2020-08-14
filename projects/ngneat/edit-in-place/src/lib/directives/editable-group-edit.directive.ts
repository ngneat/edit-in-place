import { Directive, HostListener } from '@angular/core';
import { EditableGroupActionDirective } from './editable-group-action.directive';

@Directive({
  selector: '[editableGroupEdit]',
})
export class EditableGroupEditDirective extends EditableGroupActionDirective {
  @HostListener('click')
  onClick(): void {
    this.group.displayEdition();
  }
}
