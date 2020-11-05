import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  constructor() {}

  isDescriptionEditable: boolean;

  @Input() description: string;

  @Input() knowledgePoint: string;

  @Input() rubric: string;

  ngOnInit(): void {}

  onDescriptionChange(description) {
    this.description = description;
  }

  onKnowledgePointChange(knowledgePoint) {
    this.knowledgePoint = knowledgePoint;
  }

  onRubricChange(rubric) {
    this.rubric = rubric;
  }

  setDescriptionEditable() {
    this.isDescriptionEditable = !this.isDescriptionEditable;
  }
}
