import {TaskDTO} from '@swagger/model/taskDTO';

export namespace Task {
  export class Set {
    static type = '[Task] Set Task';

    constructor(public value: TaskDTO) {
    }
  }
}
