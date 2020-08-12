import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EditableComponent } from '../editable.component';
import { fromEvent } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[editableOnCancel]',
})
export class EditableCancelDirective implements OnInit {
  @Input() cancelEvent = 'click';

  constructor(private editable: EditableComponent, private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, this.cancelEvent)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.editable.cancelEdition());
  }
}
