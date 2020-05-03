import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UserVO } from '@swagger/model/userVO';

import { User } from '@store/actions/user.actions';
import { StateInterface } from '@store/state.interface';

@State<StateInterface>({
  name: 'state',
  defaults: {},
})
export class AppState {
  @Selector()
  public static user(state: StateInterface): UserVO {
    return state.user;
  }

  @Action(User.Set)
  public setUser(ctx: StateContext<StateInterface>, action: User.Set): void {
    ctx.setState({
      ...ctx.getState(),
      user: action.value,
    });
  }
}
