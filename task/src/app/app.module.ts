import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddnewtaskComponent } from './addnewtask/addnewtask.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { LogoutComponent } from './logout/logout.component';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddnewuserComponent,
    AddnewtaskComponent,
    DashboardComponent,
    ViewtaskComponent,
    TaskupdateComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
