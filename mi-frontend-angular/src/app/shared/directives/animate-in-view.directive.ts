import { Directive, ElementRef, Renderer2, Input, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appAnimateInView]',
  standalone: true
})
export class AnimateInViewDirective implements AfterViewInit {
  @Input() appAnimateInView: string = 'fade-up';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

   ngAfterViewInit() {
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      this.renderer.addClass(this.el.nativeElement, 'in-view');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'in-view');
    }
  }, {
    threshold: 0.5,              // Solo cuando la mitad está visible (ajusta si quieres)
    rootMargin: '-120px 0px 0px 0px'  // Empieza a animar 120px más arriba
  });

  obs.observe(this.el.nativeElement);
}
}

