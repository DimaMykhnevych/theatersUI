import { Component, OnInit } from '@angular/core';
import { TheaterTypes } from '../enums/theaterTypes.enum';
import { TheaterTypeMapper } from '../mappers/theater-type.mapper';
import { ITheater } from '../models/theater';
import { TheaterService } from '../services/theater.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-theater-add-form',
  templateUrl: './theater-add-form.component.html',
  styleUrls: ['./theater-add-form.component.css'],
})
export class TheaterAddFormComponent implements OnInit {
  public range = [...Array(13).keys()];
  public response: ITheater;
  public theater;
  public theaterObject: ITheater = {
    id: 0,
    addressId: 0,
    name: '',
    theaterType: 0,
    address: {
      id: 0,
      houseNumber: 0,
      streetName: '',
    },
  };

  constructor(
    private service: TheaterService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let id = params['theater'];
      if (id) {
        this.service.getTheaterById(id).subscribe((theater) => {
          console.log(theater);
          this.theaterObject = theater;
        });
      }
    });
  }

  public getType(theterType: TheaterTypes): string {
    return TheaterTypeMapper.getTypeString(theterType);
  }
  public onSubmitClick(formValues) {
    this.mapAddintTheaterObject(formValues);
    this.service.addTheaters(this.theaterObject).subscribe((respone) => {
      this.response = respone;
      if (this.response) {
        this.notification.showSuccess(
          'Театр успешно добавлен',
          'Добавление',
          2500
        );
        this.router.navigate(['/theaters']);
      }
    });
  }

  public mapAddintTheaterObject(formValues): void {
    this.theaterObject.name = formValues.name;
    this.theaterObject.theaterType = parseInt(formValues.theaterType);
    this.theaterObject.address.streetName = formValues.streetName;
    this.theaterObject.address.houseNumber = parseInt(formValues.houseNumber);
  }
}
