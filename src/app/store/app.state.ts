import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CourseDTO } from '@swagger/model/courseDTO';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { TopicDTO } from '@swagger/model/topicDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { Course } from '@store/actions/course.actions';
import { Lesson } from '@store/actions/lesson.actions';
import { Topic } from '@store/actions/topic.actions';
import { User } from '@store/actions/user.actions';
import { StateInterface } from '@store/state.interface';
import {TaskDTO} from '@swagger/model/taskDTO';
import {Task} from '@store/actions/task.actions';
import {TaskResult} from '@store/actions/task-result.actions';
import {TaskResultDTO} from '@swagger/model/taskResultDTO';

@State<StateInterface>({
  name: 'state',
  defaults: {
    user: null,
    course: null,
    topic: null,
    lesson: null,
    task: null,
    taskResult: null,
  },
})
export class AppState {
  @Selector()
  public static user(state: StateInterface): UserDTO {
    return state.user;
  }

  @Selector()
  public static course(state: StateInterface): CourseDTO {
    return state.course;
  }

  @Selector()
  public static lesson(state: StateInterface): LessonDTO {
    return state.lesson;
  }

  @Selector()
  public static topic(state: StateInterface): TopicDTO {
    return state.topic;
  }

  @Selector()
  public static task(state: StateInterface): TaskDTO {
    return state.task;
  }

  @Selector()
  public static taskResult(state: StateInterface): TaskResultDTO {
    return state.taskResult;
  }

  @Action(User.Set)
  public setUser(ctx: StateContext<StateInterface>, action: User.Set): void {
    ctx.setState({
      ...ctx.getState(),
      user: action.value,
    });
  }

  @Action(Course.Set)
  public setCourse(ctx: StateContext<StateInterface>, action: Course.Set): void {
    ctx.setState({
      ...ctx.getState(),
      course: action.value,
    });
  }

  @Action(Lesson.Set)
  public setLesson(ctx: StateContext<StateInterface>, action: Lesson.Set): void {
    ctx.setState({
      ...ctx.getState(),
      lesson: action.value,
    });
  }

  @Action(Topic.Set)
  public setTopic(ctx: StateContext<StateInterface>, action: Topic.Set): void {
    ctx.setState({
      ...ctx.getState(),
      topic: action.value,
    });
  }

  @Action(Task.Set)
  public setTask(ctx: StateContext<StateInterface>, action: Task.Set): void {
    ctx.setState({
      ...ctx.getState(),
      task: action.value,
    });
  }

  @Action(TaskResult.Set)
  public setTaskResult(ctx: StateContext<StateInterface>, action: TaskResult.Set): void {
    ctx.setState({
      ...ctx.getState(),
      taskResult: action.value,
    });
  }
}
