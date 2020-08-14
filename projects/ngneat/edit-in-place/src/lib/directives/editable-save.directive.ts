import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[editableOnSave]',
})
export class EditableSaveDirective implements OnInit {
  @Input() saveEvent = 'click';

  constructor(private readonly editable: EditableComponent, private readonly el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, this.saveEvent)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.editable.saveEdition());
  }
}
