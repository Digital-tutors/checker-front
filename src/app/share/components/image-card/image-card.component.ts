import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent {
  @Input()
  public image: string;
  @Input()
  public title: string;
  @Input()
  public sup: string;
  @Input()
  public bottom: boolean;
  @Input()
  public center: boolean;
}
