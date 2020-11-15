import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IGetPerformanceParams } from '../models/performanceParams';
import { ITheater } from '../models/theater';
import { ITheaterPerformance } from '../models/theater-performance';
import { ITheaterPerformanceParams } from '../models/theater-performance-params';

import { DialogService } from '../services/dialog.service';
import { NotificationService } from '../services/notification.service';
import { TheaterPerformanceService } from '../services/theater-performance.service';
import { TheaterService } from '../services/theater.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements OnInit {
  public isLoaded: boolean = true;
  public isSearching: boolean;
  public isAscSortPerf: boolean;

  public isAscSort: boolean;
  public fieldToSort: string;
  public theaterName: string;
  public performanceName: string;
  public startDate: Date;
  public endDate: Date;
  public startPrice: number;
  public endPrice: number;

  public theaterPerformances: ITheaterPerformance[] = [];
  public searchResult: ITheaterPerformance[] = [];
  public theaters: ITheater[] = [];

  constructor(
    private service: TheaterPerformanceService,
    private theaterService: TheaterService,
    private dialogService: DialogService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loadTheaterPerformances({});
    this.theaterService.getTheaters({}).subscribe((theaters) => {
      this.theaters = theaters;
    });
  }

  private _loadTheaterPerformances(params: ITheaterPerformanceParams): void {
    this.service
      .GetTheaterPerformances(params)
      .subscribe((theaterPerformances) => {
        if (theaterPerformances) this.isLoaded = false;
        if (!this.isSearching) {
          this.theaterPerformances = theaterPerformances;
        } else if (this.performanceName) {
          this.searchResult = theaterPerformances;
          this.isSearching = true;
        } else {
          this.searchResult = [];
        }
      });
  }

  public onChangeSelect() {
    this.isSearching = false;
    this.updateRequest();
  }

  public onTheaterNameSortClick() {
    this.isAscSort = !this.isAscSort;
    this.fieldToSort = 'theaterName';
    this.updateRequest();
  }

  public onPerformanceNameSortClick() {
    this.isAscSortPerf = !this.isAscSortPerf;
    this.fieldToSort = 'performanceName';
    this.updateRequest();
  }

  public onPerformanceKeyUp(value) {
    this.performanceName = value;
    this.isSearching = true;
    if (value == '') this.isSearching = false;
    this.updateRequest();
  }

  public onBlurStartDate(date): void {
    this.startDate = date;
    this.isSearching = false;
    this.updateRequest();
  }

  public onBlurEndDate(date): void {
    this.endDate = date;
    this.isSearching = false;
    this.updateRequest();
  }

  public onBlurStartPrice(price): void {
    this.startPrice = price;
    this.isSearching = false;
    this.updateRequest();
  }

  public onBlurEndPrice(price: number): void {
    this.endPrice = price;
    this.isSearching = false;
    this.updateRequest();
  }

  public onFilterClick(): void {
    if (this.isSearching) {
      this.theaterPerformances = this.searchResult;
      this.isSearching = false;
    }
  }

  public onDeleteBtnClick(id: number): void {
    const deletedItem = this.theaterPerformances.filter((t) => t.id === id)[0];
    const tName = deletedItem.theater.name;
    const pName = deletedItem.performance.name;
    this.dialogService
      .openConfirmDialog({
        title: 'Удаление элемента афиши',
        content: `Вы действительно хотите удалить 
        представление ${pName} 
        из театра ${tName}?`,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'yes') {
          this.service
            .deleteTheaterPerformance(id)
            .pipe(filter(Boolean))
            .subscribe((response) => {
              this.updateRequest();
            });
          this.showDeleteNotification(pName, tName);
        }
      });
  }

  public onRowClick(tp): void {
    this.router.navigate(['/addPoster'], {
      queryParams: {
        theaterPerformance: tp.id,
      },
    });
  }

  public onClearClick(): void {
    this.theaterName = null;
    this.performanceName = '';
    this.startDate = null;
    this.endDate = null;
    this.startPrice = undefined;
    this.endPrice = undefined;
    this.isSearching = false;
    this.updateRequest();
  }

  public updateRequest(): void {
    this._loadTheaterPerformances({
      descending:
        this.fieldToSort === 'theaterName'
          ? !this.isAscSort
          : !this.isAscSortPerf,
      fieldToSort: this.fieldToSort,
      theaterName: this.theaterName,
      performanceName: this.performanceName,
      startDate: this.startDate,
      endDate: this.endDate,
      startPrice: this.startPrice,
      endPrice: this.endPrice,
    });
  }

  public isMatching(tpId): boolean {
    if (this.searchResult.map((value) => value.id).includes(tpId)) {
      return true;
    }
    return false;
  }

  public showDeleteNotification(performanceName, theaterName): void {
    this.notification.showSuccess(
      `Представление ${performanceName} в театре ${theaterName} успешно удалено`,
      'Удаление',
      4000
    );
  }
}
