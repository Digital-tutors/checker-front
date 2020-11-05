import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleRequestControllerService } from '@swagger/api/api';
import { UserDTO } from '@swagger/model/userDTO';

import { AppState } from '@store/app.state';

import { RoleRequestDTO } from '../../../swagger/model/roleRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  // @Select(AppState.user)
  // public readonly user$: Observable<UserDTO>;

  public roles = {
    USER: UserDTO.RoleEnum.USER,
    STUDENT: UserDTO.RoleEnum.STUDENT,
    TEACHER: UserDTO.RoleEnum.TEACHER,
    ADMIN: UserDTO.RoleEnum.ADMIN,
    SUPER_ADMIN: UserDTO.RoleEnum.SUPERADMIN,
  };

  public hasRoles$(role: UserDTO.RoleEnum): Observable<boolean> {
    return this.user$.pipe(map((user: UserDTO) => user && user.role === role));
  }
}
