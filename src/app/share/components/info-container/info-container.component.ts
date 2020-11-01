import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent {
  @Input()
  public bottom: boolean;
  @Input()
  public center: boolean;
  @Input()
  public title: string;
  @Input()
  public text: string;
}
