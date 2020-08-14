import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EditableGroupDirective } from './editable-group.directive';
import { takeUntil } from 'rxjs/operators';
import { Mode } from '../mode';
import { Subject } from 'rxjs';

@Directive({
  selector: '[editableGroup-cancel]',
})
export class EditableGroupCancelDirective implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly group: EditableGroupDirective,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  ngOnInit(): void {
    this.group.mode$.pipe(takeUntil(this.destroy$)).subscribe((mode: Mode) => {
      this.renderer.setStyle(this.el.nativeElement, 'display', mode === Mode.VIEW ? 'none' : 'block');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  @HostListener('click')
  onClick(): void {
    this.group.cancelEdition();
  }
}
