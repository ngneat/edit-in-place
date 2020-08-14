import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[viewMode]',
})
export class ViewModeDirective {
  constructor(public readonly tpl: TemplateRef<any>) {}
}
