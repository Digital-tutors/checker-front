import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

export interface TopicWithPayloadInterface {
  topic: TopicDTOShortResView;
  lessons: LessonDTOShortResView[];
  tasks: TaskDTO[];
}
