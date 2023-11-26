import { DestroyRef, Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { EditableComponent } from '../editable.component';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[editableOnCancel]',
  standalone: true,
})
export class EditableCancelDirective implements OnInit {
  #editable = inject(EditableComponent);
  #el = inject(ElementRef);
  #destroyRef = inject(DestroyRef);

  @Input() cancelEvent = 'click';

  ngOnInit(): void {
    fromEvent(this.#el.nativeElement, this.cancelEvent)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.#editable.cancelEdit());
  }
}
