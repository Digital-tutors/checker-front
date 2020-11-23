import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import {TestVoInterface} from '../../../../../../testing/services/interfaces/test-vo.interface';

export interface TopicWithPayloadInterface {
  topic: TopicDTOShortResView;
  lessons: LessonDTOShortResView[];
  tasks: TaskDTO[];
  tests: TestVoInterface[];
}
