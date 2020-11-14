import { FormsModule, NgForm } from '@angular/forms';
import {environment} from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule,  } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HeadderComponent } from './headder/headder.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StudentDetailsComponent } from './student-details/student-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HeadderComponent,
    AddNotesComponent,
    ShowNotesComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
