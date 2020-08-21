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
import { filter, skip, switchMapTo, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EDITABLE_CONFIG, EditableConfig } from './editable.config';

@Component({
  selector: 'editable',
  template: `
    <ng-container *ngTemplateOutlet="(editMode$ | async) ? editModeTpl.tpl : viewModeTpl.tpl"></ng-container>
  `,
  styles: [':host {cursor: pointer;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent implements OnInit, OnDestroy {
  @Input() openBindingEvent = this.config.openBindingEvent || 'click';
  @Input() closeBindingEvent = this.config.closeBindingEvent || 'click';

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  private readonly editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly editMode$: Observable<boolean> = this.editMode.asObservable();
  public viewHandler: Subscription;
  public editHandler: Subscription;
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
  }

  private handleViewMode(): void {
    this.viewHandler = fromEvent(this.element, this.openBindingEvent)
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.editMode$),
        filter(([_, editMode]) => !editMode)
      )
      .subscribe(() => this.displayEditMode());
  }

  private handleEditMode(): void {
    const clickOutside$ = fromEvent(document, this.closeBindingEvent).pipe(
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
        filter((editMode) => editMode),
        switchMapTo(clickOutside$),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.saveEdit());
  }

  public displayEditMode(): void {
    this.editMode.next(true);
  }

  public saveEdit(): void {
    this.save.next();
    this.editMode.next(false);
  }

  public cancelEdit(): void {
    this.cancel.next();
    this.editMode.next(false);
  }
}
