import {  Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FbserviceService} from '../services/fbservice.service';
import { async } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.scss']
})
export class ShowNotesComponent implements OnInit {
  constructor(public route: Router, public fbs: FbserviceService,  private db: AngularFirestore,) {
   }

  ngOnInit(): void {
  }
getDate = (date: any) => {
  return new Date(date * 1000);
}
editData= (id)=>{
  Swal.fire({
    text: 'Please wait',
    imageUrl: '../../assets/img/Spinner-1s-200px.gif',
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  if (id && this.fbs.user) {
     this.db
       .collection(this.fbs.user.uid)
       .ref.where('id', '==', id)
       .get()
       .then((doc) => {
         if (doc.size === 1) {
           doc.forEach((d) => {
             Swal.close();
             this.route.navigate(['add_notes', d.data()]);
           });
         }
       }).finally(()=>{Swal.close()});
   }
   else{
     Swal.close();
   }
}
}
