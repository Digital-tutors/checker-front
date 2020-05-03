export * from './taskController.service';
import { TaskControllerService } from './taskController.service';
export * from './taskResultsController.service';
import { TaskResultsControllerService } from './taskResultsController.service';
export * from './topicController.service';
import { TopicControllerService } from './topicController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [TaskControllerService, TaskResultsControllerService, TopicControllerService, UserControllerService];
