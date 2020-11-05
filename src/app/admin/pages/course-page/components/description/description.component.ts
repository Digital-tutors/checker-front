import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  constructor() {}

  description =
    'Lorem ipsum dolor sit amet,\n' +
    '      consectetur adipiscing elit. Aenean consectetur, massa quis accumsan malesuada, est urna condimentum neque, in\n' +
    '      fermentum nunc nulla ac tortor. Cras nec rhoncus magna. Suspendisse non fringilla urna. Phasellus auctor, ex ac\n' +
    '      dignissim efficitur, diam ante varius nulla, eget auctor ex mauris a tellus. Pellentesque ut iaculis lectus.\n' +
    '      Aliquam eu risus enim. Mauris quis metus a augue facilisis dignissim. Duis nibh ipsum, cursus vel dictum\n' +
    '      dignissim, molestie vitae massa.';
  rubric = '';

  descriptionControl = new FormControl();

  ngOnInit(): void {
    this.descriptionControl.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  }

  onDescriptionChange(description) {
    this.description = description;
  }
  onRubricChange(rubric) {
    this.rubric = rubric;
  }
}
