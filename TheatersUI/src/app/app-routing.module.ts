import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TheaterAddFormComponent } from './theater-add-form/theater-add-form.component';
import { TheatersUpdateComponent } from './theaters-update/theaters-update.component';
import { TheatersComponent } from './theaters/theaters.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'addTheaters/:id', component: TheaterAddFormComponent },
  { path: 'addTheaters', component: TheaterAddFormComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
