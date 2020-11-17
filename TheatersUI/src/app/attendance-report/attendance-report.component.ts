import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TheaterTypes } from '../enums/theaterTypes.enum';
import { TheaterTypeMapper } from '../mappers/theater-type.mapper';
import { ITheaterAttendance } from '../models/theater-attendance';
import { TheaterPerformanceService } from '../services/theater-performance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {
  public theatersAttendance: ITheaterAttendance[] = [];
  public mostPopularTheaters: ITheaterAttendance[] = [];
  public mostUnpopularTheaters: ITheaterAttendance[] = [];
  public isLoaded: boolean = true;

  constructor(
    private service: TheaterPerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getTheaterAttendance().subscribe((resp) => {
      if (resp) this.isLoaded = false;
      this.theatersAttendance = resp;
    });
    this.service.getMostPopularTheaters().subscribe((popular) => {
      this.mostPopularTheaters = popular;
    });
    this.service.getMostUnpopularTheaters().subscribe((unpopular) => {
      this.mostUnpopularTheaters = unpopular;
    });
  }

  public onRowClick(theater): void {
    this.router.navigate(['/addTheaters'], {
      queryParams: {
        theater: theater.id,
      },
    });
  }

  public getType(theterType: TheaterTypes): string {
    return TheaterTypeMapper.getTypeString(theterType);
  }
}
