import { CourseDTO } from '@swagger/model/courseDTO';
import { UserDTO } from '@swagger/model/userDTO';

export interface StateInterface {
  user?: UserDTO;
  course?: CourseDTO;
}
