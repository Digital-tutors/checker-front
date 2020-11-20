import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import {ThemeTestsInterface} from '../../../../testing/services/interfaces/theme-tests.interface';

export interface TopicWithLessonsInterface {
  topic: TopicDTOShortResView;
  lessons: LessonDTOShortResView[];
  tasks: TaskDTO[];
  tests: ThemeTestsInterface[];
}
