import { Component, OnInit } from '@angular/core';
import { TheaterTypes } from '../enums/theaterTypes.enum';
import { TheaterTypeMapper } from '../mappers/theater-type.mapper';
import { ITheater } from '../models/theater';
import { TheaterService } from '../services/theater.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-add-form',
  templateUrl: './theater-add-form.component.html',
  styleUrls: ['./theater-add-form.component.css'],
})
export class TheaterAddFormComponent implements OnInit {
  public range = [...Array(13).keys()];
  public response: ITheater;
  public isAdding: boolean = true;
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

  public form = new FormGroup({
    name: new FormControl(this.theaterObject.name, Validators.required),
    theaterType: new FormControl(
      this.theaterObject.theaterType,
      Validators.required
    ),
    streetName: new FormControl(this.theaterObject.address.streetName, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[а-яА-Я]([а-яА-Я-.]+\\s*)+$'),
    ]),
    houseNumber: new FormControl(this.theaterObject.address.houseNumber, [
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$'),
    ]),
  });

  get name() {
    return this.form.get('name');
  }
  get theaterType() {
    return this.form.get('theaterType');
  }
  get streetName() {
    return this.form.get('streetName');
  }
  get houseNumber() {
    return this.form.get('houseNumber');
  }

  public fillFormWithValues() {
    this.name.setValue(this.theaterObject.name);
    this.theaterType.setValue(this.theaterObject.theaterType);
    this.streetName.setValue(this.theaterObject.address.streetName);
    this.houseNumber.setValue(this.theaterObject.address.houseNumber);
  }

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
        this.isAdding = false;
        this.service.getTheaterById(id).subscribe((theater) => {
          this.theaterObject = theater;
          this.fillFormWithValues();
        });
      }
    });
  }

  public getType(theterType: TheaterTypes): string {
    return TheaterTypeMapper.getTypeString(theterType);
  }
  public onSubmitClick() {
    this.mapAddintTheaterObject(this.form.value);
    if (this.isAdding) {
      this.addTheater();
    } else {
      this.updateTheater();
    }
  }

  public updateTheater(): void {
    this.service
      .updateTheater(this.theaterObject.id, this.theaterObject)
      .subscribe((response) => {
        this.response = response;
        if (this.response) {
          this.notification.showSuccess(
            `Театр ${this.response.name} успешно изменен`,
            'Изменение',
            2500
          );
          this.router.navigate(['/theaters']);
        }
      });
  }

  public addTheater(): void {
    this.service.addTheaters(this.theaterObject).subscribe((respone) => {
      this.response = respone;
      if (this.response) {
        this.notification.showSuccess(
          `Театр ${this.response.name} успешно добавлен`,
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
