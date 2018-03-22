import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, MultiSelectModule, AutoCompleteModule } from 'primeng/primeng';
import { fakeBackendProvider } from './services/fake-backend.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { InputTextModule, ButtonModule, FileUploadModule, DialogModule, SharedModule, CheckboxModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './pages/alert/alert.component';
import { AuthGuard } from './auth.guard';
import { AnnouncementService } from './services/announcement.service';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { SortableTableDirective } from './components/sortable-table/sortable-table.directive';

import { SessionService } from './services/session.service';
import { ConfigService } from './services/config.service';
import { SiteService } from './services/site.service';
import { ActivityService } from './services/activity.service';
import { ReportService } from './services/report.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { StatusService } from './services/status.service';
import { MessageService } from './services/message.service';
import { MaintenanceService } from './services/maintenance.service';
import { ApplicantService } from './services/applicant.service';
import { LoginService } from './services/login.service';
import { SortService } from './components/sortable-table/sort.service';
import { CompanyService } from './services/company.service';

import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { MenuComponent } from './components/menu/menu.component';
import { ComposeComponent } from './components/compose/compose.component';
import { InboxComponent } from './pages/messages/inbox/inbox.component';
import { SentboxComponent } from './pages/messages/sentbox/sentbox.component';
import { ApproveformComponent } from './components/approveform/approveform.component';
import { SortableColumnComponent } from './components/sortable-table/sortable-column.component';
import { AnnouncementcomposeComponent } from './components/announcementcompose/announcementcompose.component';
import { ViewSentComponent } from './pages/messages/viewsent/viewsent.component';
import { RecentActivityComponent } from './pages/recent-activity/recent-activity.component';
import { ViewReceivedComponent } from './pages/messages/viewreceived/viewreceived.component';
import { InvalidDomainComponent } from './pages/invalid-domain/invalid-domain.component';
import { MessageReportComponent } from './pages/report/message-report/message-report.component';
import { MyAccountComponent } from './pages/myaccount/myaccount.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MostRecentComponent } from './components/mostrecent/mostrecent.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatusComponent } from './pages/status/status.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { LoadingComponent } from './components/loading/loading.component';

// Pipes
import { FilterUnitsPipe } from './pipes/filter-units.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HtmlToPlainPipe } from './pipes/html-to-plain.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { UploadFileService } from './services/upload-file.service';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { BuildingReportComponent } from './pages/report/building-report/building-report.component';
import { ReportNavComponent } from './pages/report/report-nav/report-nav.component';
import { SiteSwitchComponent } from './components/site-switch/site-switch.component';
import { CommunityReportComponent } from './pages/report/community-report/community-report.component';
import { AttachmentListComponent } from './pages/report/attachment-list/attachment-list.component';
import { LeasingComponent } from './pages/leasing/leasing.component';
import { LeaseFormComponent } from './components/lease-form/lease-form.component';
import { SrNotesComponent } from './pages/leasing/sr-notes/sr-notes.component';
import { MessageFilterComponent } from './pages/messages/message-filter/message-filter.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    EditorModule,
    MultiSelectModule,
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SharedModule,
    FileUploadModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    RecentActivityComponent,
    ViewSentComponent,
    InvalidDomainComponent,
    SafeHtmlPipe,
    HtmlToPlainPipe,
    ReplacePipe,
    FilterUnitsPipe,
    MessageReportComponent,
    ViewReceivedComponent,
    MyAccountComponent,
    ActivityComponent,
    ShortenPipe,
    MessageListComponent,
    MostRecentComponent,
    FormUploadComponent,
    BuildingReportComponent,
    LoadingComponent,
    ReportNavComponent,
    SiteSwitchComponent,
    CommunityReportComponent,
    AttachmentListComponent,
    LeasingComponent,
    LeaseFormComponent,
    SrNotesComponent,
    MessageFilterComponent,
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useValue: AuthHeaderInterceptor.getInstance(),
        multi: true,
      },
      AuthGuard,
      AlertService,
      ActivityService,
      ApplicantService,
      AuthenticationService,
      UserService,
      ConfigService,
      SiteService,
      StatusService,
      UploadFileService,
      CompanyService,
      fakeBackendProvider,
      MockBackend,
      BaseRequestOptions,
      MessageService,
      MaintenanceService,
      AnnouncementService,
      SessionService,
      LoginService,
      SortService,
      ReportService,
      {
        provide: AuthHeaderInterceptor,
        useValue: AuthHeaderInterceptor.getInstance(),
      }
  ],
  entryComponents: [ComposeComponent, AnnouncementcomposeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
