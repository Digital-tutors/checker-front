import {TaskResultDTO} from '@swagger/model/taskResultDTO';

export namespace TaskResult {
  export class Set {
    static type = '[TaskResult] Set TaskResult';

    constructor(public value: TaskResultDTO) {
    }
  }
}
