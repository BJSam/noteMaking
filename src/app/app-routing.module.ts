import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';

const routes: Routes = [
  {
    path: 'add_notes',
    component: AddNotesComponent
  },
  {
    path: 'show_notes',
    component: ShowNotesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
