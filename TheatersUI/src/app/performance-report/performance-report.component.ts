import { Component, OnInit } from '@angular/core';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceStatuses } from '../enums/performance-statuses.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { PerformanceStatusMapper } from '../mappers/performance-status';
import { ITheaterPerformance } from '../models/theater-performance';
import { TheaterPerformanceService } from '../services/theater-performance.service';

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css'],
})
export class PerformanceReportComponent implements OnInit {
  public isLoaded = true;
  public activeTheaterPerformances: ITheaterPerformance[] = [];
  public canceledTheaterPerformances: ITheaterPerformance[] = [];
  public postponedTheaterPerformances: ITheaterPerformance[] = [];
  constructor(private service: TheaterPerformanceService) {}

  ngOnInit(): void {
    this.service.getActiveTheaterPerformances().subscribe((response) => {
      if (response) this.isLoaded = false;
      this.activeTheaterPerformances = response;
    });
    this.service.getCanceledTheaterPerformances().subscribe((response) => {
      this.canceledTheaterPerformances = response;
    });
    this.service.getPosponedTheaterPerformances().subscribe((response) => {
      this.postponedTheaterPerformances = response;
    });
  }

  public getStatus(performanceStatus: PerformanceStatuses): string {
    return PerformanceStatusMapper.getStatusString(performanceStatus);
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }
  public printPage() {
    window.print();
  }
}
