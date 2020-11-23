import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatDialog} from '@angular/material/dialog';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, mergeMap, shareReplay, startWith, takeUntil, tap} from 'rxjs/operators';

import {SidebarService} from '@share/services/sidebar.service';

import {AlertWindowTestComponent} from 'app/admin/components/alert-window-test/alert-window-test.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TestingService} from '../../../testing/services/testing.service';
import {ActivatedRoute} from '@angular/router';
import {TestVoInterface} from '../../../testing/services/interfaces/test-vo.interface';
import {LessonAdminControllerService} from '@swagger/api/lessonAdminController.service';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {QuestionVoInterface} from '../../../testing/services/interfaces/question-vo.interface';
import {QuestionTypeEnum} from '../../../testing/services/enums/question-type.enum';
import {TestDtoInterface} from '../../../testing/services/interfaces/test-dto.interface';
import {QuestionDtoInterface} from '../../../testing/services/interfaces/question-dto.interface';

@Component({
  selector: 'app-admin-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  private questionUnSelected$: Subject<void> = new Subject();

  public form: FormGroup;

  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public lessons: LessonDTO[] = [];
  public filteredLessons$: Observable<LessonDTO[]>;
  public items: string[] = ['1', '2', '3'];
  public inputValue = 'Clear me';

  public test: TestVoInterface;

  public selectedQuestionForm: AbstractControl;

  public tagsControls: FormControl[] = [];

  public questionTypeEnum: typeof QuestionTypeEnum = QuestionTypeEnum;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private sidebarService: SidebarService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private testingService: TestingService,
    private activatedRoute: ActivatedRoute,
    private lessonAdminController: LessonAdminControllerService,
  ) {
  }

  ngOnInit(): void {
    this.sidebarService.setSidebar(null);
    this.getTest();
    this.getLessons();
  }

  private getLessons(): void {
    this.activatedRoute
      .params
      .pipe(
        mergeMap(params => this.lessonAdminController.getLessonForAdminByTopicIdUsingGET(params.topicId)),
        tap(lessons => this.lessons = lessons),
      )
      .subscribe();
  }

  private getTest(): void {
    this.activatedRoute
      .params
      .pipe(
        mergeMap(params => this.testingService.getTestAdmin(params.topicId, params.testId))
      )
      .subscribe((test: TestVoInterface) => {
        this.test = test;
        this.setForm(test);
      });
  }

  private setForm(test: TestVoInterface): void {
    this.form = this.fb.group({
      questions: this.setQuestionsForm([...test.easy_questions, ...test.medium_questions, ...test.difficult_questions]),
    });
  }

  private getQuestionForm(question: QuestionVoInterface): FormGroup {
    return this.fb.group({
      id: [question._id],
      qtype: [question.qtype, Validators.required],
      text: [question.text, [Validators.required]],
      difficulty: [question.difficulty, [Validators.required]],
      points: [question.points, [Validators.min(1)]],
      right_answers: [(question.right_answers || []).map(item => item.toString())],
      answers: this.setAnswers(question),
      subtheme: [question.subtheme],
    });
  }

  private setQuestionsForm(questions: QuestionVoInterface[]): FormArray {
    // console.log(questions.filter(item => item !== null));
    console.log(questions);
    return this.fb.array(questions.map(question => this.getQuestionForm(question)));
  }

  private getAnswerForm(index: string, value: string, checked = false): FormGroup {
    return this.fb.group({
      index: [index],
      value: [value, Validators.required],
      checked: [checked],
    });
  }

  private setAnswers(question: QuestionVoInterface): FormArray {
    return this.fb.array(
      Object.entries(question.answers).map(([index, value]) => this.getAnswerForm(index, value, question.right_answers.includes(Number(index))))
    );
  }

  public handleCheckbox(index: string): void {
    if (this.selectedQuestionForm.value.right_answers?.includes(index)) {
      this.selectedQuestionForm.get('right_answers').setValue(
        this.selectedQuestionForm.value.right_answers.filter(item => item !== index),
      );
    } else {
      const handledRightAnswers = [...(this.selectedQuestionForm.value.right_answers || []), index];
      this.selectedQuestionForm.get('right_answers').setValue(handledRightAnswers);
    }

    requestAnimationFrame(() => {
      if (this.selectedQuestionForm.value.right_answers.length > 1) {
        this.selectedQuestionForm.get('qtype').setValue(QuestionTypeEnum.MULTIPLE);
      } else if (this.selectedQuestionForm.value.right_answers.length === 1) {
        this.selectedQuestionForm.get('qtype').setValue(QuestionTypeEnum.SINGLE);
      }
    });
  }

  public isAnswerRight(index: number): Observable<boolean> {
    return this.selectedQuestionForm.get('right_answers').valueChanges.pipe(
      map(answers => answers.includes(index)),
      takeUntil(this.questionUnSelected$),
    );
  }

  public selectQuestion(question: AbstractControl): void {
    if (this.selectedQuestionForm?.value?.id === question.value.id) {
      this.selectedQuestionForm = null;
      return;
    }
    this.selectedQuestionForm = question;
    this.filteredLessons$ = this.selectedQuestionForm.get('subtheme').valueChanges.pipe(
      startWith(''),
      map(name => {
        let lessons: LessonDTO[] = this.lessons.slice();

        if (name && typeof name === 'string') {
          lessons = this.lessons.filter(item => item.title.toLowerCase().indexOf(name.toLowerCase()) === 0);
        }

        return lessons;
      }),
    );
  }

  public openDialog(): void {
    this.dialog.open(AlertWindowTestComponent, {
      width: '473px',
      height: '224px',
      data: this.activatedRoute.snapshot.params.testId,
    });
  }

  public displayLessonTitle = (lessonId: number): string => {
    return this.lessons.find(({id}) => id === lessonId)?.title;
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get answers(): FormArray {
    return this.selectedQuestionForm.get('answers') as FormArray;
  }

  public onAddAnswer(): void {
    this.answers.push(this.getAnswerForm(this.answers.value.length + 1, 'Ответ'));
  }

  public addQuestion(): void {
    this.testingService
      .createQuestion({
        text: 'Новый вопрос',
        difficulty: 1,
        subtheme: -1,
        points: 1,
        qtype: QuestionTypeEnum.SINGLE,
        right_answers: [],
        answers: {},
      })
      .pipe(
        mergeMap(question =>
          this.testingService.updateTest(
            this.activatedRoute.snapshot.params.testId,
            {
              ...this.test,
              easy_questions: [...this.test.easy_questions.map(item => item._id), question._id],
              medium_questions: this.test.medium_questions.map(item => item._id),
              difficult_questions: this.test.difficult_questions.map(item => item._id),
            }
          ).pipe(
            tap(() => {
              this.test = {
                ...this.test,
                easy_questions: [...this.test.easy_questions, question],
              };
            }),
            map(() => question),
          )
        )
      )
      .subscribe(question => {
        this.questions.push(this.getQuestionForm(question));
      });
  }

  public saveQuestion(): void {
    const handledQuestion: QuestionDtoInterface & { id: string } = {
      ...this.selectedQuestionForm.value,
      answers: {},
    };

    this.selectedQuestionForm.value.answers.forEach(({index, value}) => {
      handledQuestion.answers[index] = value;
    });

    handledQuestion.right_answers = handledQuestion.right_answers.map(item => Number(item));

    this.form = this.fb.group({
      questions: this.fb.array(
        (this.form.get('questions') as FormArray).controls.map(item => {
          if (item.value.id === handledQuestion.id) {
            return this.selectedQuestionForm;
          }
          return item;
        })
      )
    });

    const updatedTest: TestDtoInterface & { _id: string; } = {
      ...this.test,
      difficult_questions: this.test.medium_questions.filter(item => item._id !== handledQuestion.id).map(item => item._id),
      medium_questions: this.test.medium_questions.filter(item => item._id !== handledQuestion.id).map(item => item._id),
      easy_questions: this.test.medium_questions.filter(item => item._id !== handledQuestion.id).map(item => item._id),
    };

    if (handledQuestion.difficulty === 1) {
      updatedTest.easy_questions.push(handledQuestion.id);
    } else if (handledQuestion.difficulty === 2) {
      updatedTest.medium_questions.push(handledQuestion.id);
    } else if (handledQuestion.difficulty === 3) {
      updatedTest.difficult_questions.push(handledQuestion.id);
    }

    this.testingService
      .updateQuestion(handledQuestion.id, handledQuestion)
      .pipe(
        mergeMap(() => this.testingService.updateTest(updatedTest._id, updatedTest)),
      )
      .subscribe(() => {
        this.selectedQuestionForm = null;
        this.openSnackBar();
      });
  }

  public deleteAnswer(index: number): void {
    const answer = this.selectedQuestionForm.get('answers').value[index];
    this.handleCheckbox(answer.index);
    (this.selectedQuestionForm.get('answers') as FormArray).removeAt(index);
  }

  public deleteQuestion(): void {
    if (confirm('Вы действительно хотите удалить вопрос?')) {
      this.testingService
        .deleteQuestion(this.selectedQuestionForm.value.id)
        .subscribe(() => {
          this.selectedQuestionForm = null;
          this.snackBar.open('Вопрос был успешно удален', 'OK', {
            duration: 2000,
          });
        });
    }
  }

  public openSnackBar() {
    this.snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }

  public getQuestionTypeName(type: QuestionTypeEnum): string {
    switch (type) {
      case QuestionTypeEnum.MULTIPLE:
        return 'Множественный выбор';
      case QuestionTypeEnum.SINGLE:
        return 'Одиночный выбор';
      default:
        return 'Тип вопроса не выбран';
    }
  }
}
