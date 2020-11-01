import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-box-grid',
  templateUrl: './two-box-grid.component.html',
  styleUrls: ['./two-box-grid.component.scss'],
})
export class TwoBoxGridComponent implements OnInit {
  @Input()
  public center: boolean;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    if (this.center) {
      this.elRef.nativeElement.classList.add('center');
    }
  }
}
