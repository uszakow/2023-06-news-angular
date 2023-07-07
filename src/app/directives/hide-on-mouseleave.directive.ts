import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHideOnMouseleave]',
})
export class HideOnMouseleaveDirective implements OnInit {
  @Input('appHideOnMouseleave') targetSelector: string;

  targetElement: HTMLElement | null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover')
  onMouseOver(): void {
    this.updateTargetClass(false);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.updateTargetClass(true);
  }

  private updateTargetClass(hide: boolean): void {
    if (!this.targetElement) {
      return;
    }

    if (hide) {
      this.renderer.addClass(this.targetElement, 'none');
    } else {
      this.renderer.removeClass(this.targetElement, 'none');
    }
  }

  ngOnInit(): void {
    this.targetElement = this.elementRef.nativeElement.querySelector(
      this.targetSelector
    );

    this.updateTargetClass(true);
  }
}
