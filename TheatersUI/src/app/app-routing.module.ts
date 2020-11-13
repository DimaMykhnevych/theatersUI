import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerformancesComponent } from './performances/performances.component';
import { TheaterAddFormComponent } from './theater-add-form/theater-add-form.component';
import { TheatersComponent } from './theaters/theaters.component';
import { PerformanceAddFormComponent } from './performance-add-form/performance-add-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'performances', component: PerformancesComponent },
  { path: 'addTheaters/:id', component: TheaterAddFormComponent },
  { path: 'addTheaters', component: TheaterAddFormComponent },
  { path: 'addPerformance', component: PerformanceAddFormComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
