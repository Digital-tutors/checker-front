import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import {TestVoInterface} from '../../../../testing/services/interfaces/test-vo.interface';
import {LessonWithResultInterface} from './lesson-with-result.interface';

export interface TopicWithLessonsInterface {
  topic: TopicDTOShortResView;
  lessons: LessonWithResultInterface[];
  tasks: TaskDTO[];
  tests: TestVoInterface[];
}
