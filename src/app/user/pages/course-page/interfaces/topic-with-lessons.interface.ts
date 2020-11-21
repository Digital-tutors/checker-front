import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import {ThemeTestsInterface} from '../../../../testing/services/interfaces/theme-tests.interface';
import {LessonWithResultInterface} from './lesson-with-result.interface';

export interface TopicWithLessonsInterface {
  topic: TopicDTOShortResView;
  lessons: LessonWithResultInterface[];
  tasks: TaskDTO[];
  tests: ThemeTestsInterface[];
}
