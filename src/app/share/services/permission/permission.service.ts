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
  constructor(private roleRequestControllerService: RoleRequestControllerService) {}

  public roles = {
    USER: RoleRequestDTO.RequiredRoleEnum.USER,
    TEACHER: RoleRequestDTO.RequiredRoleEnum.TEACHER,
    ADMIN: RoleRequestDTO.RequiredRoleEnum.ADMIN,
    SUPER_ADMIN: RoleRequestDTO.RequiredRoleEnum.SUPERADMIN,
  };

  public hasRoles$(role: RoleRequestDTO.RequiredRoleEnum): Observable<boolean> {
    return this.roleRequestControllerService.requestAccessForRequiredRoleUsingPOST({ requiredRole: role });
  }
}
