import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-window',
  templateUrl: './teacher-window.component.html',
  styleUrls: ['./teacher-window.component.scss'],
})
export class TeacherWindowComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TeacherWindowComponent>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public navigateToAdmin() {
    this.router.navigate(['admin/courses']);
    this.dialogRef.close();
  }
}
