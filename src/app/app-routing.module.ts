import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import{ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import{PageNotFoundComponent} from './page-not-found/page-not-found.component'
  
const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword/:token',component:ResetPasswordComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

