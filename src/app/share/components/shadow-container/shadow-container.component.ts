import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shadow-container',
  templateUrl: './shadow-container.component.html',
  styleUrls: ['./shadow-container.component.scss'],
})
export class ShadowContainerComponent {
  @Input()
  public noPadding: boolean;
}
