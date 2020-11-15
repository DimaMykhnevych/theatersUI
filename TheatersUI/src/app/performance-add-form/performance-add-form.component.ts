import { Component, OnInit } from '@angular/core';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceStatuses } from '../enums/performance-statuses.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { PerformanceStatusMapper } from '../mappers/performance-status';
import { PerformanceService } from '../services/performance.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPerformance } from '../models/performance';

@Component({
  selector: 'app-performance-add-form',
  templateUrl: './performance-add-form.component.html',
  styleUrls: ['./performance-add-form.component.css'],
})
export class PerformanceAddFormComponent implements OnInit {
  public statusRange = [...Array(3).keys()];
  public genreRange = [...Array(22).keys()];
  public isAdding: boolean = true;
  public response: IPerformance;
  public performanceObj: IPerformance = {
    id: 0,
    name: '',
    performanceStatus: 0,
    performanceGenre: 0,
    author: '',
    composer: '',
  };

  constructor(
    private service: PerformanceService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let id = params['performance'];
      if (id) {
        this.isAdding = false;
        this.service.getPerformanceById(id).subscribe((performance) => {
          this.performanceObj = performance;
          this.fillFormWithValues();
        });
      }
    });
  }

  public form = new FormGroup({
    name: new FormControl(this.performanceObj.name, Validators.required),
    performanceStatus: new FormControl(
      this.performanceObj.performanceStatus,
      Validators.required
    ),
    performanceGenre: new FormControl(
      this.performanceObj.performanceGenre,
      Validators.required
    ),
    author: new FormControl(this.performanceObj.author, [
      Validators.pattern('^[a-zA-Zа-яА-Я\\s\\.]+$'),
    ]),
    composer: new FormControl(this.performanceObj.composer, [
      Validators.pattern('^[a-zA-Zа-яА-Я\\s\\.]+$'),
    ]),
  });

  get name() {
    return this.form.get('name');
  }
  get performanceStatus() {
    return this.form.get('performanceStatus');
  }
  get performanceGenre() {
    return this.form.get('performanceGenre');
  }
  get author() {
    return this.form.get('author');
  }
  get composer() {
    return this.form.get('composer');
  }

  public onSubmitClick() {
    this.mapAddingPerformanceObject(this.form.value);
    if (this.isAdding) {
      this.addPerformance();
    } else {
      this.updatePerformance();
    }
  }

  public updatePerformance(): void {
    this.service
      .updatePerformance(this.performanceObj.id, this.performanceObj)
      .subscribe((response) => {
        this.response = response;
        if (this.response) {
          this.notification.showSuccess(
            `Предатсавление ${this.response.name} успешно изменено`,
            'Изменение',
            2500
          );
          this.router.navigate(['/performances']);
        }
      });
  }

  public addPerformance(): void {
    this.service
      .addPerformance(this.performanceObj)
      .subscribe((responsePerf) => {
        this.response = responsePerf;
        if (this.response) {
          this.notification.showSuccess(
            `Представление ${this.response.name} успешно добавлено`,
            'Добавление',
            2500
          );
          this.router.navigate(['/performances']);
        }
      });
  }

  public getStatus(performanceStatus: PerformanceStatuses): string {
    return PerformanceStatusMapper.getStatusString(performanceStatus);
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }

  public mapAddingPerformanceObject(formValues): void {
    this.performanceObj.name = formValues.name;
    this.performanceObj.author = formValues.author;
    this.performanceObj.composer = formValues.composer;
    this.performanceObj.performanceGenre = parseInt(
      formValues.performanceGenre
    );
    this.performanceObj.performanceStatus = parseInt(
      formValues.performanceStatus
    );
  }

  public fillFormWithValues() {
    this.name.setValue(this.performanceObj.name);
    this.performanceStatus.setValue(this.performanceObj.performanceStatus);
    this.performanceGenre.setValue(this.performanceObj.performanceGenre);
    this.author.setValue(this.performanceObj.author);
    this.composer.setValue(this.performanceObj.composer);
  }
}
