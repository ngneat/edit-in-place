import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[editMode]',
  standalone: true,
})
export class EditModeDirective {
  tpl = inject(TemplateRef);
}
