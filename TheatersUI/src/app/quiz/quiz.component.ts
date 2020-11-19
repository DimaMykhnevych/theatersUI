import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion } from '../models/question';
import { IVariant } from '../models/variant';
import { QuestionService } from '../services/question.service';
import { VariantService } from '../services/variant.service';
import { UserAnswerService } from '../services/user-answer.service';
import { registerLocaleData } from '@angular/common';
import { IUserAnswer } from '../models/user-answer';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public userId: number;
  public questions: IQuestion[] = [];
  public variants: IVariant[] = [];
  public userAnswers: IUserAnswer[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private variantService: VariantService,
    private userAnswerService: UserAnswerService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((userId) => {
      this.userId = parseInt(userId['userId']);
    });
    this.getQuestions();
    this.getVariants();
  }

  public getQuestions(): void {
    this.questionService.getAllQuestions().subscribe((q) => {
      this.questions = q;
    });
  }

  public getVariants(): void {
    this.variantService.getAllVariants().subscribe((v) => {
      this.variants = v;
    });
  }

  public getVariantsByQuestionId(questionId: number): IVariant[] {
    return this.variants.filter((v) => v.questionId === questionId);
  }

  public onSendButtonClick(): void {
    for (let i = 0; i < this.questions.length; i++) {
      let selectedVariant: number = parseInt(
        (<HTMLInputElement>document.getElementById(`${this.questions[i].id}`))
          .value
      );
      this.userAnswers.push({
        id: 0,
        userId: this.userId,
        variantId: selectedVariant,
      });
    }
    this.sendUserAnswer();
  }

  private sendUserAnswer(): void {
    this.userAnswerService.addUserAnswer(this.userAnswers).subscribe((resp) => {
      if (resp) {
        this.notification.showSuccess(
          `Спасибо за участие в опросе. Ваши ответы сохранены!`,
          'Опрос',
          5000
        );
        this.router.navigate(['/home']);
      }
    });
  }

  public onCancelBtnClick(): void {
    this.router.navigate(['/home']);
  }
}
