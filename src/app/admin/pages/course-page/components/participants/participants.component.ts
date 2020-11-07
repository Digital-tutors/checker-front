import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { UserAdminControllerService } from '@swagger/api/userAdminController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent implements OnInit {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public students$: Observable<UserDTO[]>;

  public form: FormGroup;

  constructor(private userAdminControllerService: UserAdminControllerService) {}

  ngOnInit(): void {
    this.setStudents();
  }

  private setStudents(): void {
    this.students$ = this.course$.pipe(
      filter((course: CourseDTO) => !!course),
      mergeMap((course: CourseDTO) => this.userAdminControllerService.getAllUsersByCourseUsingGET(course.id)),
    );
  }
}
