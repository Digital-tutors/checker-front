import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CourseDTO } from '@swagger/model/courseDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { Course } from '@store/actions/course.actions';
import { User } from '@store/actions/user.actions';
import { StateInterface } from '@store/state.interface';

@State<StateInterface>({
  name: 'state',
  defaults: {
    user: null,
    course: null,
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
}
