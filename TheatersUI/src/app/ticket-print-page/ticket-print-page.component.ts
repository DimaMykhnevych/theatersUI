import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { PerformanceGenreMapper } from '../mappers/performance-genre-mapper';
import { IAllOrderInfo } from '../models/all-order-info';
import { IOrder } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-ticket-print-page',
  templateUrl: './ticket-print-page.component.html',
  styleUrls: ['./ticket-print-page.component.css'],
})
export class TicketPrintPageComponent implements OnInit {
  public orderId: number;
  public order: IAllOrderInfo;
  // public performanceDate: number;
  public ticketsRange: number[];
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((orderIdUrl) => {
      let orderId = orderIdUrl['orderId'];
      this.orderId = parseInt(orderId);
      this.orderService.getAllOrderOnfo(this.orderId).subscribe((order) => {
        this.order = order;
        this.ticketsRange = [...Array(this.order.ticketsAmount).keys()];
        // this.performanceDate = this.order.theaterPerformance.performanceDate.getDay();
      });
    });
  }
  get performanceDay() {
    let newDate = new Date(this.order.theaterPerformance.performanceDate);
    return newDate.getDate();
  }

  get performanceMonth() {
    let newDate = new Date(this.order.theaterPerformance.performanceDate);
    return newDate.toLocaleString('ru', {
      month: 'short',
    });
  }

  get performanceDate() {
    let newDate = new Date(this.order.theaterPerformance.performanceDate);
    return newDate.toLocaleDateString();
  }

  get performanceTime() {
    let newDate = new Date(this.order.theaterPerformance.performanceDate);
    return newDate.toTimeString().slice(0, 5);
  }

  public getGenre(performanceGenre: PerformanceGenres): string {
    return PerformanceGenreMapper.getGenreString(performanceGenre);
  }

  public onPrintClick() {
    window.print();
  }
}
