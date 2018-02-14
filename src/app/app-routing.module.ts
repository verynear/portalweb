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
import { MessageComponent } from './pages/messages/message/message.component';
import { InvalidDomainComponent } from './pages/invalid-domain/invalid-domain.component';
import { ReportComponent } from './pages/messages/report/report.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'applicants', component: ApplicantsComponent, canActivate: [AuthGuard] },
  { path: 'applicantlist', component: DatatableComponent, canActivate: [AuthGuard] },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    // TODO create a page/component for each children
    children: [
      { path: '', redirectTo: 'sent', pathMatch: 'full' },
      { path: 'view/:id', component: MessageComponent },
      { path: 'sent', component: SentboxComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'notifications', component: MessagesComponent }
    ]
  },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuard] },
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
