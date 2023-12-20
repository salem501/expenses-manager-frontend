import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from './dashboard/dashboard.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import {TransactionModule} from "./transaction/transaction.module";

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    DashboardComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    TransactionModule,
    NgOptimizedImage,
    CommonModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
