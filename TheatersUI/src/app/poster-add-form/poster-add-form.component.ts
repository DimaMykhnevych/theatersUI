import { Component, OnInit } from '@angular/core';

import { PerformanceService } from '../services/performance.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { TheaterService } from '../services/theater.service';
import { TheaterPerformanceService } from '../services/theater-performance.service';
import { ITheater } from '../models/theater';
import { IPerformance } from '../models/performance';
import { ITheaterPerformanceParams } from '../models/theater-performance-params';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddUpdateTheaterPerformance } from '../models/add-update-theater-perf';

@Component({
  selector: 'app-poster-add-form',
  templateUrl: './poster-add-form.component.html',
  styleUrls: ['./poster-add-form.component.css'],
})
export class PosterAddFormComponent implements OnInit {
  public theaters: ITheater[] = [];
  public performances: IPerformance[] = [];
  private theaterNameValue: string;
  private performanceNameValue: string;

  public response: IAddUpdateTheaterPerformance;
  public isAdding: boolean = true;
  public addUpdateThPerfObj: IAddUpdateTheaterPerformance = {
    id: 0,
    theaterId: 2,
    performanceId: 1,
    performanceDate: null,
    ticketPrice: 0,
  };

  constructor(
    private performanceService: PerformanceService,
    private theaterService: TheaterService,
    private theaterPerformanceService: TheaterPerformanceService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._loadTheaters();
    this._loadPerformances();
    this.route.queryParams.subscribe((params) => {
      let id = params['theaterPerformance'];
      if (id) {
        this.isAdding = false;
        this.theaterPerformanceService
          .getTheaterPerformanceById(id)
          .subscribe((tp) => {
            this.addUpdateThPerfObj = tp;
            this.fillFormWithValues();
          });
      }
    });
  }

  public form = new FormGroup({
    theaterName: new FormControl(
      this.addUpdateThPerfObj.theaterId,
      Validators.required
    ),
    performanceName: new FormControl(
      this.addUpdateThPerfObj.performanceId,
      Validators.required
    ),
    performanceDate: new FormControl(
      this.addUpdateThPerfObj.performanceDate,
      Validators.required
    ),
    ticketPrice: new FormControl(
      this.addUpdateThPerfObj.ticketPrice,
      Validators.required
    ),
  });

  get theaterName() {
    return this.form.get('theaterName');
  }
  get performanceName() {
    return this.form.get('performanceName');
  }
  get performanceDate() {
    return this.form.get('performanceDate');
  }
  get ticketPrice() {
    return this.form.get('ticketPrice');
  }

  public onSubmitClick() {
    this.mapAddingTheaterPerformanceObject(this.form.value);
    if (this.isAdding) {
      this.addTheaterPerformance();
    } else {
      this.updateTheaterPerformance();
    }
  }

  public addTheaterPerformance(): void {
    this.theaterPerformanceService
      .addTheaterPerformance(this.addUpdateThPerfObj)
      .subscribe((responseTPerf) => {
        this.response = responseTPerf;
        if (this.response) {
          this.defineTheaterAndPerformanceNames();
          this.notification.showSuccess(
            `Представление ${this.performanceNameValue} успешно добавлено в  ${this.theaterNameValue}`,
            'Добавление',
            2500
          );
          this.router.navigate(['/poster']);
        }
      });
  }

  public updateTheaterPerformance(): void {
    this.theaterPerformanceService
      .updateTheaterPerformance(
        this.addUpdateThPerfObj.id,
        this.addUpdateThPerfObj
      )
      .subscribe((response) => {
        this.response = response;
        if (this.response) {
          this.defineTheaterAndPerformanceNames();
          this.notification.showSuccess(
            `Представление ${this.performanceNameValue} 
            в  ${this.theaterNameValue} успешно изменено `,
            'Изменение',
            2500
          );
          this.router.navigate(['/poster']);
        }
      });
  }

  public _loadTheaters() {
    this.theaterService.getTheaters({}).subscribe((theaters) => {
      this.theaters = theaters;
    });
  }

  public _loadPerformances() {
    this.performanceService.getPerformances({}).subscribe((perf) => {
      this.performances = perf;
    });
  }

  public mapAddingTheaterPerformanceObject(formValues: any): void {
    this.addUpdateThPerfObj.theaterId = parseInt(formValues.theaterName);
    this.addUpdateThPerfObj.performanceId = parseInt(
      formValues.performanceName
    );
    this.addUpdateThPerfObj.performanceDate = new Date(
      formValues.performanceDate
    );
    this.addUpdateThPerfObj.ticketPrice = parseInt(formValues.ticketPrice);
  }

  public fillFormWithValues() {
    this.theaterName.setValue(this.addUpdateThPerfObj.theaterId);
    this.performanceName.setValue(this.addUpdateThPerfObj.performanceId);
    this.performanceDate.setValue(this.addUpdateThPerfObj.performanceDate);
    this.ticketPrice.setValue(this.addUpdateThPerfObj.ticketPrice);
  }

  private defineTheaterAndPerformanceNames(): void {
    this.theaterNameValue = this.theaters.filter(
      (t) => t.id == this.response.theaterId
    )[0].name;
    this.performanceNameValue = this.performances.filter(
      (t) => t.id == this.response.performanceId
    )[0].name;
  }
}
