import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-test-window',
  templateUrl: './test-window.component.html',
  styleUrls: ['./test-window.component.scss'],
})
export class TestWindowComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TestWindowComponent>
  ) {
  }

  ngOnInit(): void {
  }

  public close(): void {
    localStorage.setItem('test', '1');
    this.dialogRef.close();
  }
}
