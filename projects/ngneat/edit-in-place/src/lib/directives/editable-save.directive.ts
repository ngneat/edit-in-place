import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[editableOnSave]',
})
export class EditableSaveDirective implements OnInit, OnDestroy {
  @Input() saveEvent = 'click';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly editable: EditableComponent, private readonly el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, this.saveEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.editable.saveEdition());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
