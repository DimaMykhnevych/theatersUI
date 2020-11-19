import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from '../app/services/dialog.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TheaterService } from '../app/services/theater.service';
import { PerformanceService } from '../app/services/performance.service';

import { TheatersComponent } from './theaters/theaters.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { TheaterAddFormComponent } from './theater-add-form/theater-add-form.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { PerformancesComponent } from './performances/performances.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PerformanceAddFormComponent } from './performance-add-form/performance-add-form.component';
import { PosterComponent } from './poster/poster.component';
import { PosterAddFormComponent } from './poster-add-form/poster-add-form.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AttendancePerformanceReportComponent } from './attendance-performance-report/attendance-performance-report.component';
import { PopularGenresReportComponent } from './popular-genres-report/popular-genres-report.component';
import { TicketSalesReportComponent } from './ticket-sales-report/ticket-sales-report.component';
import { PerformanceReportComponent } from './performance-report/performance-report.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { PerformancesReviewPageComponent } from './performances-review-page/performances-review-page.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { TicketPrintPageComponent } from './ticket-print-page/ticket-print-page.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    TheatersComponent,
    NavBarComponent,
    HomeComponent,
    TheaterAddFormComponent,
    MatConfirmDialogComponent,
    PerformancesComponent,
    SpinnerComponent,
    PerformanceAddFormComponent,
    PosterComponent,
    PosterAddFormComponent,
    AttendanceReportComponent,
    AttendancePerformanceReportComponent,
    PopularGenresReportComponent,
    TicketSalesReportComponent,
    PerformanceReportComponent,
    MakeOrderComponent,
    PerformancesReviewPageComponent,
    UserRegistrationFormComponent,
    OrderReviewComponent,
    TicketPrintPageComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [TheaterService, DialogService, PerformanceService],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent],
})
export class AppModule {}
