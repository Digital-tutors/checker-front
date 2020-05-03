import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  @Select(AppState.user)
  public readonly user$: Observable<UserVO>;

  public roles = {
    USER: UserVO.RoleEnum.USER,
    STUDENT: UserVO.RoleEnum.STUDENT,
    TEACHER: UserVO.RoleEnum.TEACHER,
    ADMIN: UserVO.RoleEnum.ADMIN,
    SUPER_ADMIN: UserVO.RoleEnum.SUPERADMIN,
  };

  public hasRoles$(role: UserVO.RoleEnum): Observable<boolean> {
    return this.user$.pipe(map((user: UserVO) => user && user.role === role));
  }
}
