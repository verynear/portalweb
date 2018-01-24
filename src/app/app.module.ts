import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, MultiSelectModule } from 'primeng/primeng';
import { fakeBackendProvider } from './services/fake-backend.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InputTextModule, ButtonModule, DataTableModule, DialogModule, SharedModule, CheckboxModule } from 'primeng/primeng';

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
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthHeaderInterceptor, AUTH_HEADER_INTERCEPTOR_PROVIDER } from './auth-header.interceptor';
import { SessionService } from './services/session.service';

import { ProgressSpinnerModule } from 'primeng/primeng';
import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ApplicantService } from './services/applicant.service';
import { LoginService } from './services/login.service';
import { MenuComponent } from './components/menu/menu.component';
import { ComposeComponent } from './components/compose/compose.component';
import { InboxComponent } from './pages/messages/inbox/inbox.component';
import { SentboxComponent } from './pages/messages/sentbox/sentbox.component';
import { ApproveformComponent } from './components/approveform/approveform.component';
import { SortableColumnComponent } from './components/sortable-table/sortable-column.component';

import { SortableTableDirective } from './components/sortable-table/sortable-table.directive';
import { SortService } from './components/sortable-table/sort.service';
import { AnnouncementcomposeComponent } from './components/announcementcompose/announcementcompose.component';
import { MessageComponent } from './pages/messages/message/message.component';
import { SwitchComponent } from './components/switch/switch.component';
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    EditorModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    AppRoutingModule,
    ButtonModule,
    CheckboxModule,
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
    NavigationComponent,
    ApplicantsComponent,
    DatatableComponent,
    MenuComponent,
    ComposeComponent,
    InboxComponent,
    SentboxComponent,
    ApproveformComponent,
    SortableColumnComponent,
    SortableTableDirective,
    AnnouncementcomposeComponent,
    MessageComponent,
    SwitchComponent,
    SafeHtmlPipe
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useValue: AuthHeaderInterceptor.getInstance(),
        multi: true,
      },
      AuthGuard,
      AlertService,
      ApplicantService,
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
      SortService,
      AUTH_HEADER_INTERCEPTOR_PROVIDER
  ],
  entryComponents: [ComposeComponent, AnnouncementcomposeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
