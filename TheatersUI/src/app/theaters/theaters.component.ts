import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../services/theater.service';
import { TheaterTypeMapper } from '../mappers/theater-type.mapper';
import { TheaterTypes } from '../enums/theaterTypes.enum';
import { ITheater } from '../models/theater';
import { IGetTheaterParams } from '../models/theaterParams';

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
  public searchValue: string;
  public isSearching: boolean;
  public searchResult: ITheater[] = [];
  public filterValue;
  public range = [...Array(13).keys()];
  constructor(private service: TheaterService) {}

  public ngOnInit(): void {
    this._loadTheaters({});
  }

  public isMatching(id) {
    if (this.searchResult.map((value) => value.id).includes(id)) {
      return true;
    }
    return false;
  }

  public onIconClick(): void {
    this.isAscSort = !this.isAscSort;
    this.fieldToSort = 'name';
    this._loadTheaters({
      name: this.searchValue,
      descending: !this.isAscSort,
      fieldToSort: this.fieldToSort,
      type: this.selectedType,
    });
  }

  public getType(theterType: TheaterTypes): string {
    return TheaterTypeMapper.getTypeString(theterType);
  }

  private _loadTheaters(params: IGetTheaterParams): void {
    this.service.getTheaters(params).subscribe((theaters) => {
      if (!this.isSearching) {
        this.theaters = theaters;
      } else this.searchResult = theaters;
      if (this.searchValue) this.isSearching = true;
    });
  }

  public onChangeType(): void {
    this.isSearching = false;
    this._loadTheaters({
      name: this.searchValue,
      descending: !this.isAscSort,
      fieldToSort: this.fieldToSort,
      type: this.selectedType,
    });
  }

  public onTheaterNameKeyUp(searchValue: string): void {
    this.searchValue = searchValue;
    this.isSearching = true;
    if (searchValue === '') {
      this.isSearching = false;
    }
    this._loadTheaters({
      name: this.searchValue,
      descending: !this.isAscSort,
      fieldToSort: this.fieldToSort,
      type: this.selectedType,
    });
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
    this._loadTheaters({
      name: this.searchValue,
      descending: !this.isAscSort,
      fieldToSort: this.fieldToSort,
      type: this.selectedType,
    });
  }
}
