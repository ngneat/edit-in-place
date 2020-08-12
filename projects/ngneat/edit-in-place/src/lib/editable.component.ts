import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EDITABLE_CONFIG, EditableConfig } from './editable.config';

@UntilDestroy()
@Component({
  selector: 'editable',
  template: ` <ng-container *ngTemplateOutlet="currentView"></ng-container> `,
  styles: [':host {cursor: pointer;}'],
})
export class EditableComponent implements OnInit {
  @Input() openBindingEvent = this.config.openBindingEvent || 'click';
  @Input() closeBindingEvent = this.config.closeBindingEvent || 'click';

  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  @ViewChild('input') input: ElementRef;

  private mode: 'edit' | 'view' = 'view';
  private editMode: Subject<boolean> = new Subject<boolean>();
  private editMode$: Observable<boolean> = this.editMode.asObservable();

  constructor(readonly el: ElementRef, @Inject(EDITABLE_CONFIG) readonly config: EditableConfig) {}

  public get currentView(): TemplateRef<any> {
    if (!this.viewModeTpl && !this.editModeTpl) {
      throw new Error('the viewMode and the editMode are missing');
    } else if (!this.viewModeTpl) {
      throw new Error('the viewMode is missing');
    } else if (!this.editModeTpl) {
      throw new Error('the editMode is missing');
    }
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  private get element(): any {
    return this.el.nativeElement;
  }

  ngOnInit(): void {
    this.handleViewMode();
    this.handleEditMode();
  }

  private handleViewMode(): void {
    fromEvent(this.element, this.openBindingEvent)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  private handleEditMode(): void {
    const clickOutside$ = fromEvent(document, this.closeBindingEvent).pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );

    this.editMode$.pipe(switchMapTo(clickOutside$), untilDestroyed(this)).subscribe(() => this.updateEdition());
  }

  public updateEdition(): void {
    this.update.next();
    this.mode = 'view';
  }

  public cancelEdition(): void {
    this.cancel.next();
    this.mode = 'view';
  }
}
