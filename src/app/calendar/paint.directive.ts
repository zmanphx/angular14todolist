import { Directive, OnInit, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPaint]'
})
export class PaintDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  @Input()
  color= "Yellow"

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = this.color
  }  

  @HostListener('mouseover') onMouseOver(){
    this.elementRef.nativeElement.style.backgroundColor = this.color
  }

  @HostListener('mouseout') onMouseOut(){
    this.elementRef.nativeElement.style.backgroundColor = "White"
  }


}
