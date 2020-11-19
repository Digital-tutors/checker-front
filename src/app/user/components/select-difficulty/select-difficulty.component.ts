import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {FormControl} from '@angular/forms';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-user-select-difficulty',
  templateUrl: './select-difficulty.component.html',
  styleUrls: ['./select-difficulty.component.scss']
})
export class SelectDifficultyComponent implements OnInit {
  public levels: any[] = [LessonDTO.LevelEnum.EASY, LessonDTO.LevelEnum.MIDDLE, LessonDTO.LevelEnum.HARD];

  @Input()
  public currentLevel: any;

  @Output()
  public levelChanged: EventEmitter<any> = new EventEmitter();

  public formControl: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.handleCurrentLevel()
    this.handleFormControlChange();
  }

  private handleCurrentLevel(): void {
    if (this.currentLevel) {
      this.formControl.setValue(this.currentLevel);
    }
  }

  private handleFormControlChange(): void {
    this.formControl
      .valueChanges
      .pipe(
        filter(level => level !== this.currentLevel),
      )
      .subscribe(level => {
        this.levelChanged.emit(level);
      });
  }
}
