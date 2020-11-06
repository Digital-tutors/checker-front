import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CourseDTO } from '@swagger/model/courseDTO';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { Course } from '@store/actions/course.actions';
import { Lesson } from '@store/actions/lesson.actions';
import { User } from '@store/actions/user.actions';
import { StateInterface } from '@store/state.interface';

@State<StateInterface>({
  name: 'state',
  defaults: {
    user: null,
    course: null,
    topic: null,
    lesson: null,
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
}
