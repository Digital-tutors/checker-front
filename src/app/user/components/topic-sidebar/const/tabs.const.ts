import { TabsEnum } from '../enums/tabs.enum';
import { TabInterface } from '../interfaces/tab.interface';

export const TABS: TabInterface[] = [
  {
    title: 'Лекции',
    selector: TabsEnum.LESSONS,
  },
  {
    title: 'Задачи',
    selector: TabsEnum.TASKS,
  },
  {
    title: 'Тесты',
    selector: TabsEnum.TESTS,
  },
];
