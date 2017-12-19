import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { fakeBackendProvider } from './services/fake-backend.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AlertComponent } from './pages/alert/alert.component';
import { AuthGuard } from './auth.guard';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { StatusService } from './services/status.service';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatusComponent } from './pages/status/status.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessageService } from './services/message.service';
import { PaymentService } from './services/payment.service';
import { MaintenanceService } from './services/maintenance.service';
import { PaymentsComponent } from './pages/payments/payments.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { AnnouncementService } from './services/announcement.service';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthHeaderInterceptor, AUTH_HEADER_INTERCEPTOR_PROVIDER } from './auth-header.interceptor';
import { SessionService } from './services/session.service';
import { LoginService } from './services/login.service';
import { ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
    PageNotFoundComponent,
    DashboardComponent,
    MessagesComponent,
    PaymentsComponent,
    MaintenanceComponent,
    AnnouncementsComponent,
    MenuComponent,
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useValue: AuthHeaderInterceptor.getInstance(),
        multi: true,
      },
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,
      StatusService,
      fakeBackendProvider,
      MockBackend,
      BaseRequestOptions,
      MessageService,
      PaymentService,
      MaintenanceService,
      AnnouncementService,
      SessionService,
      LoginService,
      AUTH_HEADER_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
