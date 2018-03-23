import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ApplicantsComponent } from './pages/applicants/applicants.component';
import { AuthGuard } from './auth.guard';
import { StatusComponent } from './pages/status/status.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { SentboxComponent } from './pages/messages/sentbox/sentbox.component';
import { InboxComponent } from './pages/messages/inbox/inbox.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { MessageReportComponent } from './pages/report/message-report/message-report.component';
import { ViewSentComponent } from './pages/messages/viewsent/viewsent.component';
import { MyAccountComponent } from './pages/myaccount/myaccount.component';
import { ViewReceivedComponent } from './pages/messages/viewreceived/viewreceived.component';
import { InvalidDomainComponent } from './pages/invalid-domain/invalid-domain.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { BuildingReportComponent } from './pages/report/building-report/building-report.component';
import { CommunityReportComponent } from './pages/report/community-report/community-report.component';
import { ReportNavComponent } from './pages/report/report-nav/report-nav.component';
import { LeasingComponent } from './pages/leasing/leasing.component';
import { LeaseFormComponent } from './components/lease-form/lease-form.component';
import { SrNotesComponent } from './pages/sr-notes/sr-notes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'applicants', component: ApplicantsComponent, canActivate: [AuthGuard] },
  { path: 'leasing', component: LeasingComponent, canActivate: [AuthGuard]},
  { path: 'leaseform', component: LeaseFormComponent, canActivate: [AuthGuard]},
  { path: 'srnotes', component: SrNotesComponent, canActivate: [AuthGuard]},
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    // TODO create a page/component for each children
    children: [
      { path: '', redirectTo: 'sent', pathMatch: 'full' },
      { path: 'sent', component: SentboxComponent },
      { path: 'sent/:id', component: ViewSentComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'inbox/:id', component: ViewReceivedComponent }
    ]
  },
  { path: 'report/message-report/:id', component: MessageReportComponent, canActivate: [AuthGuard] },
  { path: 'report/building-report/:id', component: BuildingReportComponent, canActivate: [AuthGuard]},
  { path: 'report/community-report/:id', component: CommunityReportComponent, canActivate: [AuthGuard]},
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'invalid-domain', component: InvalidDomainComponent },
  { path: 'status', component: StatusComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
