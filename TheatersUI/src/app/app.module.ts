import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TheaterService } from '../app/services/theater.service';
import { TheatersComponent } from './theaters/theaters.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { TheaterAddFormComponent } from './theater-add-form/theater-add-form.component';
import { TheatersUpdateComponent } from './theaters-update/theaters-update.component';

@NgModule({
  declarations: [
    AppComponent,
    TheatersComponent,
    NavBarComponent,
    HomeComponent,
    TheaterAddFormComponent,
    TheatersUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [TheaterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
