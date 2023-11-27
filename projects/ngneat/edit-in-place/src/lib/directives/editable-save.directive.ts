import {DestroyRef, Directive, ElementRef, inject, Input, OnInit} from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
  selector: '[editableOnSave]',
  standalone: true,
})
export class EditableSaveDirective implements OnInit {
  #editable = inject(EditableComponent);
  #el = inject(ElementRef);
  #destroyRef = inject(DestroyRef);

  @Input() saveEvent = 'click';

  ngOnInit(): void {
    fromEvent(this.#el.nativeElement, this.saveEvent)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.#editable.saveEdit());
  }
}
