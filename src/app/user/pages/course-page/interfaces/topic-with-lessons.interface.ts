import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

export interface TopicWithLessonsInterface {
  topic: TopicDTOShortResView;
  lessons: LessonDTOShortResView[];
}
