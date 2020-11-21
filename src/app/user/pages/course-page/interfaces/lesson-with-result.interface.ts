import {LessonDTO} from '@swagger/model/lessonDTO';

export interface LessonWithResultInterface extends LessonDTO {
  isFailed?: boolean;
}
