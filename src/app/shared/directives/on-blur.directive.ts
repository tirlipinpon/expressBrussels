import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnBlur]'
})
export class OnBlurDirective {

  @Output() public onBlurInfos = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
    console.log("--0 _elementRef: ", _elementRef);
  }

  @HostListener('blur')
  public onBlur(targetElement) {
    console.log("--1 ",this._elementRef.nativeElement.value);
    console.log("--2 ",targetElement);
  }

}
