import { NgModule } from '@angular/core';
import { EditableComponent } from './editable.component';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { CommonModule } from '@angular/common';
import { EditableUpdateDirective } from './directives/editable-update.directive';
import { EditableCancelDirective } from './directives/editable-cancel.directive';
import { EditableFocusDirective } from './directives/editable-focus.directive';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';
import { EditableOnEscapeDirective } from './directives/editable-on-escape.directive';

@NgModule({
  declarations: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableUpdateDirective,
    EditableCancelDirective,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
  ],
  imports: [CommonModule],
  exports: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableUpdateDirective,
    EditableCancelDirective,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
  ],
})
export class EditableModule {}
