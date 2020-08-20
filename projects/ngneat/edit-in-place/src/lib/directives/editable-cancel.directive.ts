import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[editableOnCancel]',
})
export class EditableCancelDirective implements OnInit, OnDestroy {
  @Input() cancelEvent = 'click';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly editable: EditableComponent, private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, this.cancelEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.editable.cancelEdit());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
