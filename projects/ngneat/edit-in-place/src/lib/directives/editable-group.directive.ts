import { AfterViewInit, ContentChildren, Directive, EventEmitter, Output, QueryList } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { Mode } from '../mode';

@Directive({
  selector: '[editableGroup]',
})
export class EditableGroupDirective implements AfterViewInit {
  @ContentChildren(EditableComponent, { descendants: true }) children: QueryList<EditableComponent>;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() editableModeChange: EventEmitter<Mode> = new EventEmitter<Mode>();

  ngAfterViewInit(): void {
    this.children.forEach((child) => child.viewHandler.unsubscribe());
  }

  displayEdition(): void {
    this.editableModeChange.emit('edit');
    this.children.forEach((child) => child.displayEdition(true));
  }

  saveEdition(): void {
    this.editableModeChange.emit('view');
    this.children.forEach((child) => child.saveEdition());
    this.save.emit();
  }

  cancelEdition(): void {
    this.editableModeChange.emit('view');
    this.children.forEach((child) => child.cancelEdition());
    this.cancel.emit();
  }
}
