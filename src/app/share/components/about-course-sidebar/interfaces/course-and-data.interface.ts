import { CourseDTO } from '@swagger/model/courseDTO';
import { CourseStatDTO } from '@swagger/model/courseStatDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { AuthorWithStatsInterface } from './author-with-stats.interface';

export interface CourseAndDataInterface {
  course: CourseDTO;
  courseStats: CourseStatDTO;
  authorWithStats: AuthorWithStatsInterface;
}
