import {UserDTO} from '@swagger/model/userDTO';
import {TaskResultDTO} from '@swagger/model/taskResultDTO';
import {TaskDTO} from '@swagger/model/taskDTO';

export interface UsersResultsInterface {
  user: UserDTO;
  result: TaskResultDTO;
  task: TaskDTO;
}
