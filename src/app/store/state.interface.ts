import { CourseDTO } from '@swagger/model/courseDTO';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { TopicDTO } from '@swagger/model/topicDTO';
import { UserDTO } from '@swagger/model/userDTO';

export interface StateInterface {
  user?: UserDTO;
  course?: CourseDTO;
  topic?: TopicDTO;
  lesson?: LessonDTO;
}
