import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input()
  public active: boolean;
  @Input()
  public value: string;
  @Input()
  public caption: string;
}
