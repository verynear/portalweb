import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StatusComponent } from './pages/status/status.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StatusService } from './services/status.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './services/authguard.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { LoginComponent } from './pages/login/login.component';
import { AlertComponent } from './pages/alert/alert.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    StatusComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent
  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,
      StatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
