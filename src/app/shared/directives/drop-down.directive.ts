import {Directive, Output, EventEmitter, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class DropDownDirective {
  @Output() public clickOutside = new EventEmitter();
  @Input() public myId: string;
  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click',['$event.target'])
  public onClick(targetElement) {
    // console.log('myId: ', this.myId)

    if(targetElement.id === this.myId
      || targetElement.id === 'searchRef'
      || targetElement.id === 'search') { return; }

    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(!isClickedInside) {
      // console.log('emit null');
      this.clickOutside.emit(null);
    }
  }


}
