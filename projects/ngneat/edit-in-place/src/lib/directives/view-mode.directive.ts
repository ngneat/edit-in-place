import {Directive, inject, TemplateRef} from '@angular/core';

@Directive({
  selector: '[viewMode]',
  standalone: true,
})
export class ViewModeDirective {
  tpl = inject(TemplateRef);
}
