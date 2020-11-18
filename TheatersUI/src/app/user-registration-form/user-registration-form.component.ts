import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { AgeValidator } from '../custom-validators/age.validator';
import { TheaterPerformanceService } from '../services/theater-performance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITheaterPerformance } from '../models/theater-performance';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent implements OnInit {
  public theaterPerformance: ITheaterPerformance = null;
  public addedUser: IUser = null;
  public userObject: IUser = {
    id: 0,
    fullName: '',
    birthDate: null,
    email: '',
    telephoneNumber: '',
  };
  constructor(
    private service: TheaterPerformanceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {}

  public form = new FormGroup({
    fullName: new FormControl(this.userObject.fullName, Validators.required),
    birthDate: new FormControl(this.userObject.birthDate, [
      Validators.required,
      AgeValidator,
    ]),
    email: new FormControl(this.userObject.email, [
      Validators.required,
      Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
    ]),
    telephoneNumber: new FormControl(
      this.userObject.telephoneNumber,
      Validators.pattern('^\\+?3?8?(0\\d{9})$')
    ),
  });

  get fullName() {
    return this.form.get('fullName');
  }
  get birthDate() {
    return this.form.get('birthDate');
  }
  get email() {
    return this.form.get('email');
  }
  get telephoneNumber() {
    return this.form.get('telephoneNumber');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((theatePerfId) => {
      let id = theatePerfId['theaterPerf'];
      this.service.getTheaterPerformanceById(id).subscribe((resp) => {
        this.theaterPerformance = resp;
      });
    });
  }

  public onSubmitClick(): void {
    this.mapAddedUser(this.form.value);
    this.addUser();
  }

  private addUser(): void {
    this.userService.addUser(this.userObject).subscribe((response) => {
      this.addedUser = response;
      if (response) {
        this.notification.showSuccess(
          `Регистрация прошла успешно`,
          'Регистрация',
          2500
        );
        this.router.navigate(['/orderReview'], {
          queryParams: {
            theaterPerformanceId: this.theaterPerformance.id,
            userId: this.addedUser.id,
          },
        });
      }
    });
  }

  private mapAddedUser(formValues): void {
    this.userObject.fullName = formValues.fullName;
    this.userObject.birthDate = formValues.birthDate;
    this.userObject.email = formValues.email;
    this.userObject.telephoneNumber = formValues.telephoneNumber;
  }
}
