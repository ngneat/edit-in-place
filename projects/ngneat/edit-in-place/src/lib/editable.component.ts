import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, skip, switchMap, take } from 'rxjs/operators';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EDITABLE_CONFIG } from './editable.config';
import { Mode } from './mode';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'editable',
  template: ` <ng-container *ngTemplateOutlet="editMode() ? editModeTpl.tpl : viewModeTpl.tpl"></ng-container> `,
  styles: [':host {cursor: pointer;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgTemplateOutlet],
})
export class EditableComponent implements OnDestroy {
  #el = inject(ElementRef);
  #config = inject(EDITABLE_CONFIG);
  #destroyRef = inject(DestroyRef);

  @Input() enabled = true;
  @Input() openBindingEvent = this.#config.openBindingEvent;
  @Input() closeBindingEvent = this.#config.closeBindingEvent;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() modeChange: EventEmitter<Mode> = new EventEmitter<Mode>();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  editMode = signal(false);
  editMode$ = toObservable(this.editMode);

  public viewHandler: Subscription;
  public editHandler: Subscription;
  public isGrouped = signal(false);

  private get element(): any {
    return this.#el.nativeElement;
  }

  constructor() {
    afterNextRender(() => {
      this.handleViewMode();
      this.handleEditMode();
    });
  }

  ngOnDestroy(): void {
    // Caretaker note: we're explicitly setting these subscriptions to `null` since this actually will be closed subscriptions,
    // but they still keep referencing `destination`'s, which are `SafeSubscribers`. Destinations keep referencing `next` functions,
    // which are `() => this.displayEditMode()` and `() => this.saveEdit()`.
    // Since `next` functions capture `this`, this leads to a circular reference preventing the `EditableComponent` from being GC'd.
    this.editHandler = null;
    this.viewHandler = null;
  }

  private handleViewMode(): void {
    this.viewHandler = fromEvent(this.element, this.openBindingEvent)
      .pipe(
        filter(() => this.enabled && !this.editMode()),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.displayEditMode());
  }

  private handleEditMode(): void {
    const clickOutside$ = (editMode: boolean) =>
      fromEvent(document, this.closeBindingEvent).pipe(
        filter(() => editMode),
        /*
        skip the first propagated event if there is a nested node in the viewMode templateRef
        so it doesn't trigger this eventListener when switching to editMode
         */
        skip(this.openBindingEvent === this.closeBindingEvent ? 1 : 0),
        filter(({ target }) => this.element.contains(target) === false),
        take(1)
      );

    this.editHandler = this.editMode$
      .pipe(
        switchMap((editMode: boolean) => clickOutside$(editMode)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.saveEdit());
  }

  public displayEditMode(): void {
    this.editMode.set(true);
    this.modeChange.emit('edit');
  }

  public saveEdit(): void {
    this.save.next();
    this.leaveEditMode();
  }

  public cancelEdit(): void {
    this.cancel.next();
    this.leaveEditMode();
  }

  private leaveEditMode(): void {
    this.editMode.set(false);
    this.modeChange.emit('view');
    if (!this.isGrouped()) {
      this.viewHandler.unsubscribe();
      setTimeout(() => this.handleViewMode(), 0);
    }
  }
}
