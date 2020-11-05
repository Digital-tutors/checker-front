import { TeacherStatDTO } from '@swagger/model/teacherStatDTO';
import { UserDTO } from '@swagger/model/userDTO';

export interface AuthorWithStatsInterface {
  author: UserDTO;
  stats: TeacherStatDTO;
}
