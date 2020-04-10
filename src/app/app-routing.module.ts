import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent} from './auth/register/register.component';
import {LoginComponent } from './auth/login/login.component';
import {UserprofileComponent } from './profile/userprofile/userprofile.component';
import {AuthGuard } from './core/protected/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: RegisterComponent},
  {path: 'profiles/username', component: UserprofileComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
