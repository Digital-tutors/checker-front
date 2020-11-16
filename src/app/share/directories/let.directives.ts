import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContextInterface<T> {
  appLet: T;
}

@Directive({
  selector: '[appLet]',
})
export class LetDirective<T> implements OnChanges {
  @Input() private appLet: T;

  private context: LetContextInterface<T> = { appLet: null };

  constructor(private vcr: ViewContainerRef, private templateRef: TemplateRef<LetContextInterface<T>>) {
    this.vcr.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnChanges(): void {
    this.context.appLet = this.appLet;
  }
}
