import { Directive, HostListener } from '@angular/core';
import { EditableGroupActionDirective } from './editable-group-action.directive';

@Directive({
  selector: '[editableGroupSave]',
  standalone: true,
})
export class EditableGroupSaveDirective extends EditableGroupActionDirective {
  @HostListener('click')
  onClick(): void {
    this.group.saveEdit();
  }
}
