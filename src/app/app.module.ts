import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {DashboardComponent} from './dashboard/dashboard.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TransactionModule} from "./transaction/transaction.module";
import {PreferencesComponent} from './preferences/preferences.component';
import {ReactiveFormsModule} from "@angular/forms";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthorizationInterceptor} from "./auth-service/authorization.interceptor";
import { SignupFormComponent } from './login-page/signup-form/signup-form.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import {LoginFormComponent} from "./login-page/login-form/login-form.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    DashboardComponent,
    StatisticsComponent,
    PreferencesComponent,
    LoginFormComponent,
    SignupFormComponent,
    LoginPageComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    TransactionModule,
    NgOptimizedImage,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
