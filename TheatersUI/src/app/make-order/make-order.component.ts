import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITheater } from '../models/theater';
import { TheaterService } from '../services/theater.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css'],
})
export class MakeOrderComponent implements OnInit {
  public theaters: ITheater[] = [];
  public isLoaded: boolean = true;
  constructor(private theaterService: TheaterService, private router: Router) {}

  ngOnInit(): void {
    this.theaterService.getTheaters({}).subscribe((theaters) => {
      if (theaters) this.isLoaded = false;
      this.theaters = theaters;
    });
  }

  public onCardCLick(id): void {
    this.router.navigate(['/performanceReview'], {
      queryParams: {
        theaterId: id,
      },
    });
  }
}
