import { Pipe, PipeTransform } from '@angular/core';

import { TopicDTO } from '@swagger/model/topicDTO';

@Pipe({
  name: 'statusName',
})
export class StatusPipe implements PipeTransform {
  public transform(value: TopicDTO.StatusEnum): string {
    let name = 'Не опубликовано';

    if (value === TopicDTO.StatusEnum.PUBLISHED) {
      name = 'Опубликовано';
    } else if (value === TopicDTO.StatusEnum.ARCHIVED) {
      name = 'Архивировать';
    }

    return name;
  }
}
