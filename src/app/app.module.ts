import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StatusComponent } from './pages/status/status.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {StatusService} from './services/status.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'status', component: StatusComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserModule
  ],
  providers: [StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
