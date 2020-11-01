import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlighted-container',
  templateUrl: './highlighted-container.component.html',
  styleUrls: ['./highlighted-container.component.scss'],
})
export class HighlightedContainerComponent implements OnInit {
  @Input()
  public neutral: boolean;
  @Input()
  public color: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    if (this.neutral) {
      this.elRef.nativeElement.classList.add('neutral');
    }
  }
}
