import {Directive, HostBinding, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import * as _ from 'lodash';
@Directive({
  selector: '[appValidatorClass]'
})
export class ValidatorClassDirective {

  protected _elementClass: string[] = [];
  @Input('appValidatorClass-min') minValue: number;
  @Input() maxValue: number;

  // @HostBinding('class')
  // get elementClass(): string {
  //   return this._elementClass = [];
  // }

  @HostListener('keydown', ['$event']) private onKeyDown(event: KeyboardEvent) {
    // this._elementClass = [];
   console.log(this.el.nativeElement.value);
    this.el.nativeElement.classList = [];
   if (this.el.nativeElement.value.trim().length === 0 && !this.asClass('v-empty')) {
     this.addClass('v-empty');
   }else if (this.el.nativeElement.value.trim().length <  this.minValue && !this.asClass('v-to-short')) {
     this.addClass('v-to-short');
   }else if (this.el.nativeElement.value.trim().length >  this.maxValue && !this.asClass('v-to-long')) {
     this.addClass('v-to-long');
   }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this._elementClass = [];
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  asClass(classe: string): boolean {
    return _.includes(this.el.nativeElement.classList, classe);
  }

  addClass(className: string): void {
    this.renderer.addClass(this.el.nativeElement, className);
  }

  removeClass(className: string): void {
    this.renderer.removeClass(this.el.nativeElement, className);
  }

}
