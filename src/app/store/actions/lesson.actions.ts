import { LessonDTO } from '@swagger/model/lessonDTO';

export namespace Lesson {
  export class Set {
    static type = '[Lesson] Set Lesson';
    constructor(public value: LessonDTO) {}
  }
}
