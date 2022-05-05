import { Directive, ElementRef, Host, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})

export class ChangeBgDirective implements OnInit {
  @Input() isCurrect: Boolean = false;

  constructor(private element: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if(this.isCurrect) {
      this.render.setStyle(this.element.nativeElement, 'background-color', 'green');
      this.render.setStyle(this.element.nativeElement, 'color', 'white')
    }
    else {
      this.render.setStyle(this.element.nativeElement, 'background-color', 'red');
      this.render.setStyle(this.element.nativeElement, 'color', 'white');
    }
  }

  ngOnInit() {
    
  }
  
}
