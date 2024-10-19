import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddnewtaskComponent } from './addnewtask/addnewtask.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { LogoutComponent } from './logout/logout.component';
import { authenticateGuard } from './authenticate.guard';


const routes: Routes = [{path:'Login',component:LoginComponent},
  {path:'AddNewUser',component:AddnewuserComponent},
  {path:'AddNewTask',canActivate:[authenticateGuard],component:AddnewtaskComponent},
  {path:'Dashboard',canActivate:[authenticateGuard],component:DashboardComponent},
  {path:'ViewAllTask',canActivate:[authenticateGuard],component:ViewtaskComponent},
  {path:'TaskUpdate/:tid',canActivate:[authenticateGuard],component:TaskupdateComponent},
  {path:'Logout',canActivate:[authenticateGuard],component:LogoutComponent},
  {path:'',redirectTo:'Login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
