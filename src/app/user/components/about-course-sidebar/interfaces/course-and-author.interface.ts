import { CourseDTO } from '@swagger/model/courseDTO';
import { UserDTO } from '@swagger/model/userDTO';

export interface CourseAndAuthorInterface {
  course: CourseDTO;
  author: UserDTO;
}
