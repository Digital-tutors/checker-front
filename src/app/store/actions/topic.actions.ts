import { TopicDTO } from '@swagger/model/topicDTO';

export namespace Topic {
  export class Set {
    static type = '[Topic] Set Topic';
    constructor(public value: TopicDTO) {}
  }
}
