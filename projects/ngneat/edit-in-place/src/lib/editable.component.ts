import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { filter, skip, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EDITABLE_CONFIG, EditableConfig } from './editable.config';
import { Mode } from './mode';

@Component({
  selector: 'editable',
  template: `
    <ng-container *ngTemplateOutlet="(editMode$ | async) ? editModeTpl.tpl : viewModeTpl.tpl"></ng-container>
  `,
  styles: [':host {cursor: pointer;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent implements OnInit, OnDestroy {
  @Input() openBindingEvent = this.config.openBindingEvent;
  @Input() closeBindingEvent = this.config.closeBindingEvent;

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() modeChange: EventEmitter<Mode> = new EventEmitter<Mode>();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  private readonly editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly editMode$: Observable<boolean> = this.editMode.asObservable();
  public viewHandler: Subscription;
  public editHandler: Subscription;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isGrouped = false;

  constructor(private readonly el: ElementRef, @Inject(EDITABLE_CONFIG) readonly config: EditableConfig) {}

  private get element(): any {
    return this.el.nativeElement;
  }

  ngOnInit(): void {
    this.handleViewMode();
    this.handleEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
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
        withLatestFrom(this.editMode$),
        filter(([_, editMode]) => !editMode),
        takeUntil(this.destroy$)
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
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.saveEdit());
  }

  public displayEditMode(): void {
    this.editMode.next(true);
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
    this.editMode.next(false);
    this.modeChange.emit('view');
    if (!this.isGrouped) {
      this.viewHandler.unsubscribe();
      setTimeout(() => this.handleViewMode(), 0);
    }
  }
}
