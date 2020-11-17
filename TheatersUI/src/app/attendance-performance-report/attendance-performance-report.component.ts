import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { IPerformanceAttendance } from '../models/performance-attendance';
import { TheaterPerformanceService } from '../services/theater-performance.service';

@Component({
  selector: 'app-attendance-performance-report',
  templateUrl: './attendance-performance-report.component.html',
  styleUrls: ['./attendance-performance-report.component.css'],
})
export class AttendancePerformanceReportComponent implements OnInit {
  public performancesAttendance: IPerformanceAttendance[] = [];
  public mostPopularPerformances: IPerformanceAttendance[] = [];
  public mostUnpopularPerformances: IPerformanceAttendance[] = [];
  public isLoaded: boolean = true;

  constructor(
    private service: TheaterPerformanceService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.service.getPerformanceAttendance().subscribe((resp) => {
      if (resp) this.isLoaded = false;
      this.performancesAttendance = resp;
    });
    this.service.getMostPopularPerformances().subscribe((popular) => {
      this.mostPopularPerformances = popular;
    });
    this.service.getMostUnpopularPerformances().subscribe((unpopular) => {
      this.mostUnpopularPerformances = unpopular;
    });
  }

  public onRowClick(performance): void {
    this.router.navigate(['/addPerformance'], {
      queryParams: {
        performance: performance.id,
      },
    });
  }
  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }
}
