import { Component, OnInit } from '@angular/core';
import { TheaterPerformanceService } from '../services/theater-performance.service';
import { ITicketSales } from '../models/ticket-sales';
import { Router } from '@angular/router';
import { TheaterService } from '../services/theater.service';
import { ITheater } from '../models/theater';

import { ITheaterPerformanceParams } from '../models/theater-performance-params';

@Component({
  selector: 'app-ticket-sales-report',
  templateUrl: './ticket-sales-report.component.html',
  styleUrls: ['./ticket-sales-report.component.css'],
})
export class TicketSalesReportComponent implements OnInit {
  public isLoaded: boolean = true;
  public isReportBtnClicked: boolean;

  public startDate: Date;
  public endDate: Date;
  public theaterName: string;
  public tisketSales: ITicketSales[] = [];
  public theaters: ITheater[] = [];

  constructor(
    private service: TheaterPerformanceService,
    private router: Router,
    private theaterService: TheaterService
  ) {}

  ngOnInit(): void {
    this.theaterService.getTheaters({}).subscribe((theaters) => {
      this.theaters = theaters;
    });
  }

  public onGetReportBtnClick(): void {
    this.isReportBtnClicked = true;
    console.log(this.startDate);
    this.updateRequest();
  }

  public onChangeSelect(): void {
    this.updateRequest();
  }

  public onRowClick(id): void {
    this.router.navigate(['/addTheaters'], {
      queryParams: {
        theater: id,
      },
    });
  }

  public onClearClick(): void {
    this.startDate = null;
    this.endDate = null;
    this.theaterName = '';
    this.updateRequest();
  }

  private getTicketSales(params: ITheaterPerformanceParams) {
    this.service.getTicketSales(params).subscribe((resp) => {
      if (resp) this.isLoaded = false;
      this.tisketSales = resp;
    });
  }

  private updateRequest(): void {
    this.getTicketSales({
      theaterName: this.theaterName,
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }
}
