import { afterNextRender, ContentChildren, Directive, EventEmitter, Output, QueryList } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { Mode } from '../mode';

@Directive({
  selector: '[editableGroup]',
  standalone: true,
})
export class EditableGroupDirective {
  @ContentChildren(EditableComponent, { descendants: true }) children: QueryList<EditableComponent>;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() editableModeChange: EventEmitter<Mode> = new EventEmitter<Mode>();

  constructor() {
    afterNextRender(() => {
      this.children.forEach((child) => child.isGrouped.set(true));
      this.children.forEach((child) => child.viewHandler.unsubscribe());
      this.children.forEach((child) => child.editHandler.unsubscribe());
    });
  }

  displayEditMode(): void {
    this.editableModeChange.emit('edit');
    this.children.forEach((child) => child.displayEditMode());
  }

  saveEdit(): void {
    this.editableModeChange.emit('view');
    this.children.forEach((child) => child.saveEdit());
    this.save.emit();
  }

  cancelEdit(): void {
    this.editableModeChange.emit('view');
    this.children.forEach((child) => child.cancelEdit());
    this.cancel.emit();
  }
}
