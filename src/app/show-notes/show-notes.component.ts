import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FbserviceService} from '../services/fbservice.service';
@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.scss']
})
export class ShowNotesComponent implements OnInit {

  constructor(private db: AngularFirestore, public fbs: FbserviceService) {
   }

  ngOnInit(): void {
  console.log(this.fbs.fetchedNotes);
  }
getDate=(date: any)=>{
  return new Date(date)
}
}
