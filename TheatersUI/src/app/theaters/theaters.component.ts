import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../services/theater.service';
import { TheaterTypeMapper } from '../mappers/theater-type.mapper';
import { TheaterTypes } from '../enums/theaterTypes.enum';
import { ITheater } from '../models/theater';
import { IGetTheaterParams } from '../models/theaterParams';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css'],
})
export class TheatersComponent implements OnInit {
  public theaters: ITheater[] = [];
  public isAscSort: boolean;
  public selectedType: TheaterTypes;
  public fieldToSort: string;
  public isLoaded: boolean = true;

  public searchValue: string;
  public filterValue;

  public isSearching: boolean;
  public searchResult: ITheater[] = [];

  public range = [...Array(13).keys()];
  constructor(
    private service: TheaterService,
    private router: Router,
    private dialogService: DialogService,
    private notification: NotificationService
  ) {}

  public ngOnInit(): void {
    this._loadTheaters({});
  }

  public isMatching(id) {
    if (this.searchResult.map((value) => value.id).includes(id)) {
      return true;
    }
    return false;
  }

  public onRowClick(theater): void {
    this.router.navigate(['/addTheaters'], {
      queryParams: {
        theater: theater.id,
      },
    });
  }

  public onDeleteBtnClick(theaterId): void {
    const deletedTheaterName = this.theaters.filter(
      (t) => t.id === theaterId
    )[0].name;
    this.dialogService
      .openConfirmDialog({
        title: 'Удаление театра',
        content: `Вы действительно хотите удалить театр ${deletedTheaterName}?`,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'yes') {
          this.service
            .deleteTheater(theaterId)
            .pipe(filter(Boolean))
            .subscribe((response) => {
              this.updateRequest();
            });
          this.showDeleteNotification(deletedTheaterName);
        }
      });
  }

  public onIconClick(): void {
    this.isAscSort = !this.isAscSort;
    this.fieldToSort = 'name';
    this.updateRequest();
  }

  public getType(theterType: TheaterTypes): string {
    return TheaterTypeMapper.getTypeString(theterType);
  }

  private _loadTheaters(params: IGetTheaterParams): void {
    this.service.getTheaters(params).subscribe((theaters) => {
      if (theaters) this.isLoaded = false;
      if (!this.isSearching) {
        this.theaters = theaters;
      } else this.searchResult = theaters;
      if (this.searchValue) this.isSearching = true;
    });
  }

  public onChangeType(): void {
    this.isSearching = false;
    this.updateRequest();
  }

  public onTheaterNameKeyUp(searchValue: string): void {
    this.searchValue = searchValue;
    this.isSearching = true;
    if (searchValue === '') {
      this.isSearching = false;
    }
    this.updateRequest();
  }

  public onFilterClick(): void {
    if (this.isSearching) {
      this.theaters = this.searchResult;
      this.isSearching = false;
    }
  }
  public onClearClick(): void {
    this.selectedType = null;
    this.isSearching = false;
    this.searchValue = null;
    this.filterValue = '';
    this.updateRequest();
  }

  public updateRequest(): void {
    this._loadTheaters({
      name: this.searchValue,
      descending: !this.isAscSort,
      fieldToSort: this.fieldToSort,
      type: this.selectedType,
    });
  }

  public showDeleteNotification(name): void {
    this.notification.showSuccess(
      `Театр ${name} успешно удален`,
      'Удаление',
      2500
    );
  }
}
