import {Directive, Output, EventEmitter, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class DropDownDirective {
  @Output() public clickOutside = new EventEmitter();
  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click',['$event.target'])
  public onClick(targetElement) {

    if(targetElement.id === 'search'
      || targetElement.id === 'searchRef' ) { return; }

    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(!isClickedInside) {
      // console.log('emit null');
      this.clickOutside.emit(null);
    }
  }


}
