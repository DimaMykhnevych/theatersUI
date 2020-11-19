import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../models/order';
import { ITheaterPerformance } from '../models/theater-performance';
import { TheaterPerformanceService } from '../services/theater-performance.service';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css'],
})
export class OrderReviewComponent implements OnInit {
  public theaterPerformance: ITheaterPerformance = null;
  public addedUserId: number;
  public userEmail: string;
  public orderSum: number;
  public orderObject: IOrder = {
    id: 0,
    userId: 0,
    theaterPerformanceId: 0,
    ticketsAmount: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private tpService: TheaterPerformanceService,
    private orderService: OrderService,
    private userService: UserService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((theaterPerfId) => {
      let tpId = theaterPerfId['theaterPerformanceId'];
      this.addedUserId = parseInt(theaterPerfId['userId']);
      this.tpService.getTheaterPerformanceById(tpId).subscribe((resp) => {
        this.theaterPerformance = resp;
        this.fillFormWithValues();
      });
    });
  }
  public form = new FormGroup({
    theaterName: new FormControl(Validators.required),
    performanceName: new FormControl(Validators.required),
    ticketsAmount: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(60),
    ]),
  });

  get theaterName() {
    return this.form.get('theaterName');
  }
  get performanceName() {
    return this.form.get('performanceName');
  }
  get ticketsAmount() {
    return this.form.get('ticketsAmount');
  }

  public onPayClick(): void {
    this.orderObject = {
      id: 0,
      userId: this.addedUserId,
      theaterPerformanceId: this.theaterPerformance.id,
      ticketsAmount: parseInt(this.ticketsAmount.value),
    };
    // this.showNotific(); //!!!!
    this.addOrder(); //!!!!
  }

  public onTicketAmountInput(amount): void {
    this.orderSum = parseInt(amount) * this.theaterPerformance.ticketPrice;
  }

  private fillFormWithValues(): void {
    this.theaterName.setValue(this.theaterPerformance.theater.name);
    this.performanceName.setValue(this.theaterPerformance.performance.name);
  }

  private addOrder(): void {
    this.orderService.addOrder(this.orderObject).subscribe((response) => {
      if (response) {
        this.showNotific();
      }
    });
  }

  private showNotific(): void {
    this.userService.getUserById(this.addedUserId).subscribe((resp) => {
      this.userEmail = resp.email;
      this.notification.showSuccess(
        `Покупка билетов прошла успешно. Электронные билеты отправлены на почту ${this.userEmail}`,
        'Покупка билетов',
        5000
      );
      this.router.navigate(['/quiz'], {
        queryParams: {
          userId: this.addedUserId,
        },
      });
    });
  }
}
