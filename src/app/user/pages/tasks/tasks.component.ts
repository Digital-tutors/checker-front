import { Component, Input, OnInit } from '@angular/core';

// tslint:disable-next-line:class-name
export interface task {
  id?: number;
  author: string;
  title: string;
  description: string;
  isComplete: boolean;
}

@Component({
  selector: 'app-user-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: task[] = [
    {
      title: 'task1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, vitae?',
      author: 'Ivanov',
      isComplete: true,
    },
    {
      title: 'task2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, vitae?',
      author: 'Ivanov',
      isComplete: true,
    },
    {
      title: 'task3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, vitae?',
      author: 'Ivanov',
      isComplete: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
