import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EditableGroupDirective } from './editable-group.directive';
import { Mode } from '../mode';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[editableGroup-edit]',
})
export class EditableGroupEditDirective implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly group: EditableGroupDirective,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  ngOnInit(): void {
    this.group.mode$.pipe(takeUntil(this.destroy$)).subscribe((mode: Mode) => {
      this.renderer.setStyle(this.el.nativeElement, 'display', mode === Mode.VIEW ? 'block' : 'none');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  @HostListener('click')
  onClick(): void {
    this.group.displayEdition();
  }
}
