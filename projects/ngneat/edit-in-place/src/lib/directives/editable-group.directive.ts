import { AfterViewInit, ContentChildren, Directive, EventEmitter, Output, QueryList } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { Mode } from '../mode';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive({
  selector: '[editableGroup]',
})
export class EditableGroupDirective implements AfterViewInit {
  @ContentChildren(EditableComponent, { descendants: true }) children: QueryList<EditableComponent>;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  private readonly modeSubject: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.VIEW);
  public readonly mode$: Observable<Mode> = this.modeSubject.asObservable();

  ngAfterViewInit(): void {
    this.children.forEach((child) => child.viewHandler.unsubscribe());
  }

  displayEdition(): void {
    this.modeSubject.next(Mode.EDIT);
    this.children.forEach((child) => child.displayEdition(true));
  }

  saveEdition(): void {
    this.modeSubject.next(Mode.VIEW);
    this.children.forEach((child) => child.saveEdition());
    this.save.emit();
  }

  cancelEdition(): void {
    this.modeSubject.next(Mode.VIEW);
    this.children.forEach((child) => child.cancelEdition());
    this.cancel.emit();
  }
}
