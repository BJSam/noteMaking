import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'register', pathMatch: 'full'
  },
  {
    path: 'add_notes',
    component: AddNotesComponent
  },
  {
    path: 'show_notes',
    component: ShowNotesComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
