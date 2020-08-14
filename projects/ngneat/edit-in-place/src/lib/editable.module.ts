import { NgModule } from '@angular/core';
import { EditableComponent } from './editable.component';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { CommonModule } from '@angular/common';
import { EditableSaveDirective } from './directives/editable-save.directive';
import { EditableCancelDirective } from './directives/editable-cancel.directive';
import { EditableFocusDirective } from './directives/editable-focus.directive';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';
import { EditableOnEscapeDirective } from './directives/editable-on-escape.directive';
import { EditableGroupDirective } from './directives/editable-group.directive';
import { EditableGroupCancelDirective } from './directives/editable-group-cancel.directive';
import { EditableGroupSaveDirective } from './directives/editable-group-save.directive';
import { EditableGroupEditDirective } from './directives/editable-group-edit.directive';
import { EditableGroupActionDirective } from './directives/editable-group-action.directive';

@NgModule({
  declarations: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableSaveDirective,
    EditableCancelDirective,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
    EditableGroupDirective,
    EditableGroupCancelDirective,
    EditableGroupSaveDirective,
    EditableGroupEditDirective,
    EditableGroupActionDirective,
  ],
  imports: [CommonModule],
  exports: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableSaveDirective,
    EditableCancelDirective,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
    EditableGroupDirective,
    EditableGroupEditDirective,
    EditableGroupSaveDirective,
    EditableGroupCancelDirective,
  ],
})
export class EditableModule {}
