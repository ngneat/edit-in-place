import { Directive, HostListener } from '@angular/core';
import { EditableGroupActionDirective } from './editable-group-action.directive';

@Directive({
  selector: '[editableGroupCancel]',
  standalone: true,
})
export class EditableGroupCancelDirective extends EditableGroupActionDirective {
  @HostListener('click')
  onClick(): void {
    this.group.cancelEdit();
  }
}
