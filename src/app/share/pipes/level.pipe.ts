import { Pipe, PipeTransform } from '@angular/core';

import { TopicDTO } from '@swagger/model/topicDTO';

@Pipe({
  name: 'levelName',
})
export class LevelPipe implements PipeTransform {
  public transform(value: TopicDTO.LevelEnum): string {
    let name = 'Легкий';

    if (value === TopicDTO.LevelEnum.MIDDLE) {
      name = 'Средний';
    } else if (value === TopicDTO.LevelEnum.HARD) {
      name = 'Тяжелый';
    }

    return name;
  }
}
