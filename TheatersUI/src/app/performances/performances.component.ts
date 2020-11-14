import { Component, OnInit } from '@angular/core';
import { PerformanceStatuses } from '../enums/performance-statuses.enum';
import { IPerformance } from '../models/performance';
import { PerformanceService } from '../services/performance.service';
import { PerformanceStatusMapper } from '../mappers/performance-status';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { IGetPerformanceParams } from '../models/performanceParams';
import { DialogService } from '../services/dialog.service';
import { NotificationService } from '../services/notification.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css'],
})
export class PerformancesComponent implements OnInit {
  public isSearching: boolean;
  public isLoaded: boolean = true;
  public statusRange = [...Array(3).keys()];
  public genreRange = [...Array(22).keys()];

  public isAscSort: boolean;
  public name: string;
  public fieldToSort: string;
  public status: PerformanceStatuses;
  public genre: PerformanceGenres;
  public authorSearch: string;
  public composerSearch: string;

  public performances: IPerformance[] = [];
  public searchResult: IPerformance[] = [];

  constructor(
    private service: PerformanceService,
    private dialogService: DialogService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loadPerformances({});
  }

  private _loadPerformances(params: IGetPerformanceParams): void {
    this.service.getPerformances(params).subscribe((performances) => {
      if (performances) {
        this.isLoaded = false;
      }
      if (!this.isSearching) {
        this.performances = performances;
      } else if (this.name || this.authorSearch || this.composerSearch) {
        this.searchResult = performances;
        // this.performances = this.performances.sort(this.compare);
        this.isSearching = true;
      } else {
        this.searchResult = [];
      }
    });
  }

  // public compare(a, b) {
  //   // Use toUpperCase() to ignore character casing
  //   const bandA = a.name.toUpperCase();
  //   const bandB = b.name.toUpperCase();

  //   let comparison = 0;
  //   if (bandA > bandB) {
  //     comparison = 1;
  //   } else if (bandA < bandB) {
  //     comparison = -1;
  //   }
  //   return comparison * -1;
  // }

  public onNameSortClick(): void {
    this.isAscSort = !this.isAscSort;
    this.fieldToSort = 'name';
    this.updateRequest();
  }

  public onChangeSelect(): void {
    this.isSearching = false;
    this.updateRequest();
  }

  public onPerformanceNameKeyUp(value: string): void {
    this.name = value;
    this.isSearching = true;
    if (value === '' && this.authorSearch == '' && this.composerSearch == '') {
      this.isSearching = false;
    }
    this.updateRequest();
  }

  public onPerformanceAuthorKeyUp(value: string): void {
    this.authorSearch = value;
    this.isSearching = true;
    if (value === '' && this.composerSearch == '' && this.name == '') {
      this.isSearching = false;
    }
    this.updateRequest();
  }

  public onPerformanceComposerKeyUp(value: string): void {
    this.composerSearch = value;
    this.isSearching = true;
    if (value === '' && this.name == '' && this.authorSearch == '') {
      this.isSearching = false;
    }
    this.updateRequest();
  }

  public onFilterClick(): void {
    if (this.isSearching) {
      this.performances = this.searchResult;
      this.isSearching = false;
    }
  }

  public onClearClick(): void {
    this.name = '';
    this.authorSearch = '';
    this.composerSearch = '';
    this.status = null;
    this.genre = null;
    this.isSearching = false;
    this.updateRequest();
  }

  public isMatching(performanceId): boolean {
    if (this.searchResult.map((value) => value.id).includes(performanceId)) {
      return true;
    }
    return false;
  }

  public onRowClick(performance): void {
    this.router.navigate(['/addPerformance'], {
      queryParams: {
        performance: performance.id,
      },
    });
  }

  public onDeleteBtnClick(id: number): void {
    const deletedPerformanceName = this.performances.filter(
      (t) => t.id === id
    )[0].name;
    this.dialogService
      .openConfirmDialog({
        title: 'Удаление представления',
        content: `Вы действительно хотите удалить представление ${deletedPerformanceName}?`,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'yes') {
          this.service
            .deletePerformance(id)
            .pipe(filter(Boolean))
            .subscribe((response) => {
              this.updateRequest();
            });
          this.showDeleteNotification(deletedPerformanceName);
        }
      });
  }

  public getStatus(performanceStatus: PerformanceStatuses): string {
    return PerformanceStatusMapper.getStatusString(performanceStatus);
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }

  public updateRequest(): void {
    this._loadPerformances({
      name: this.name,
      descending: this.isAscSort,
      fieldToSort: this.fieldToSort,
      author: this.authorSearch,
      composer: this.composerSearch,
      status: this.status,
      genre: this.genre,
    });
  }
  public showDeleteNotification(name): void {
    this.notification.showSuccess(
      `Представление ${name} успешно удалено`,
      'Удаление',
      2500
    );
  }
}
