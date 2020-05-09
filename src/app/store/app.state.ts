import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UserVO } from '@swagger/model/userVO';

import { User } from '@store/actions/user.actions';
import { StateInterface } from '@store/state.interface';

@State<StateInterface>({
  name: 'state',
  defaults: {
    user: {
      id: '5eb45214ea2ee10742104e1f',
      email: 'string',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZWI0NTIxNGVhMmVlMTA3NDIxMDRlMWYiLCJmaXJzdE5hbWUiOiJzdHJpbmciLCJsYXN0TmFtZSI6InN0cmluZyIsImlzcyI6ImNoZWNrZXIubG9jYWxob3N0IiwiaWQiOiI1ZWI0NTIxNGVhMmVlMTA3NDIxMDRlMWYiLCJzY29wZXMiOiJST0xFX1VTRVIiLCJleHAiOjE1ODk4OTU2NTIsImlhdCI6MTU4OTAzMTY1Mn0.CittM1PgjikU0Eg4X7pLGSqIBwo5SavfptAj7SUq_ivMBzShNUBt1gP4gRstBKTxrH2IiUj4bnKIq0zJKiRnKg',
      firstName: 'string',
      lastName: 'string',
      confirmed: false,
      role: UserVO.RoleEnum.USER,
    },
  },
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
