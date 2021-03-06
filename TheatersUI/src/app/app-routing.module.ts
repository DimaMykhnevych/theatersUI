import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerformancesComponent } from './performances/performances.component';
import { TheaterAddFormComponent } from './theater-add-form/theater-add-form.component';
import { TheatersComponent } from './theaters/theaters.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'performances', component: PerformancesComponent },
  { path: 'addTheaters/:id', component: TheaterAddFormComponent },
  { path: 'addTheaters', component: TheaterAddFormComponent },
  { path: 'addPerformance/:id', component: PerformanceAddFormComponent },
  { path: 'addPerformance', component: PerformanceAddFormComponent },
  { path: 'poster', component: PosterComponent },
  // { path: 'addPoster/:id', component: PosterAddFormComponent },
  { path: 'addPoster', component: PosterAddFormComponent },
  { path: 'attendanceTheaters', component: AttendanceReportComponent },
  {
    path: 'attendancePerformances',
    component: AttendancePerformanceReportComponent,
  },
  {
    path: 'popularGenresAuthorsComposers',
    component: PopularGenresReportComponent,
  },
  { path: 'ticketSales', component: TicketSalesReportComponent },
  { path: 'performanceReport', component: PerformanceReportComponent },
  { path: 'makeOrder', component: MakeOrderComponent },
  {
    path: 'performanceReview',
    component: PerformancesReviewPageComponent,
  },
  { path: 'registration', component: UserRegistrationFormComponent },
  { path: 'orderReview', component: OrderReviewComponent },
  { path: 'printTicket', component: TicketPrintPageComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
