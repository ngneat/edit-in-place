import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[editableOnUpdate]',
})
export class EditableUpdateDirective implements OnInit {
  @Input() updateEvent = 'click';

  constructor(private editable: EditableComponent, private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, this.updateEvent)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.editable.updateEdition());
  }
}
