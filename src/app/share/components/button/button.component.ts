import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public bordered: boolean;
  @Input()
  public monochrome: boolean;
  @Input()
  public alert: boolean;
}
