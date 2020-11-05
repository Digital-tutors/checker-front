import { CourseDTO } from '@swagger/model/courseDTO';

export namespace Course {
  export class Set {
    static type = '[Course] Set Course';
    constructor(public value: CourseDTO) {}
  }
}
