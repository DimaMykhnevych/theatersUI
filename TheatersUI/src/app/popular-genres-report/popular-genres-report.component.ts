import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { IPopularAuthors } from '../models/popular-authors';
import { IPopularComposers } from '../models/popular-composers';
import { IPopularGenres } from '../models/popular-genres';
import { TheaterPerformanceService } from '../services/theater-performance.service';

@Component({
  selector: 'app-popular-genres-report',
  templateUrl: './popular-genres-report.component.html',
  styleUrls: ['./popular-genres-report.component.css'],
})
export class PopularGenresReportComponent implements OnInit {
  public isLoaded: boolean = true;
  public genres: IPopularGenres[] = [];
  public authors: IPopularAuthors[] = [];
  public composers: IPopularComposers[] = [];

  constructor(
    private service: TheaterPerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getPopularGenres().subscribe((resp) => {
      if (resp) this.isLoaded = false;
      this.genres = resp;
    });
    this.service.getPopularAuthors().subscribe((resp) => {
      this.authors = resp;
    });
    this.service.getPopularComposers().subscribe((resp) => {
      this.composers = resp;
    });
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }
}
