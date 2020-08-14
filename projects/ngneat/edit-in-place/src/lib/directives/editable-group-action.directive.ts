import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { EditableGroupDirective } from './editable-group.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mode } from '../mode';

@Directive({
  selector: '[]',
})
export class EditableGroupActionDirective implements OnInit, OnDestroy {
  @Output() editionOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected readonly group: EditableGroupDirective,
    protected readonly renderer: Renderer2,
    protected readonly el: ElementRef
  ) {}

  ngOnInit(): void {
    this.group.mode$.pipe(takeUntil(this.destroy$)).subscribe((mode: Mode) => {
      this.editionOpened.emit(mode === Mode.EDIT);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
