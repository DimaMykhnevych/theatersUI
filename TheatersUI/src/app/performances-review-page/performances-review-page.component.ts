import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { ITheaterPerformance } from '../models/theater-performance';
import { TheaterPerformanceService } from '../services/theater-performance.service';

@Component({
  selector: 'app-performances-review-page',
  templateUrl: './performances-review-page.component.html',
  styleUrls: ['./performances-review-page.component.css'],
})
export class PerformancesReviewPageComponent implements OnInit {
  public isLoading: boolean = true;
  public theaterPerformances: ITheaterPerformance[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TheaterPerformanceService
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((theaterId) => {
      let id = theaterId['theaterId'];
      this.service.getPerformancesByTheaterId(id).subscribe((resp) => {
        if (resp) this.isLoading = false;
        console.log(resp);
        this.theaterPerformances = resp;
      });
    });
  }

  public onCardClick(id: number): void {
    this.router.navigate(['/registration'], {
      queryParams: {
        theaterPerf: id,
      },
    });
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }
}
