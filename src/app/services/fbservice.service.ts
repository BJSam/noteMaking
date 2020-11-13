import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class FbserviceService {
  user: any;
  fetchedNotes: any;
  pleaseWait = false;
  constructor(public Auth: AngularFireAuth, private db: AngularFirestore) {
    Auth.onAuthStateChanged(user => {
      this.user = user;
      if (user){
      this.db.collection(user.uid)
      .valueChanges().subscribe((dt) => {
        this.fetchedNotes = dt;
      });
     }
    });
  }

  LoginWithGooogle: any = async () => {

   Swal.fire({
      title: 'logging you in',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false
    });
   const provider = new firebase.default.auth.GoogleAuthProvider();
   provider.addScope('profile');
   provider.addScope('email');
   this.Auth.signInWithPopup(provider).then(
  res => {
    Swal.close();
    Swal.fire('Good to see you', 'Login Success', 'success');
  }
).catch(e => {
  console.error(e);
  Swal.close();
  Swal.fire('Oops...', 'Login Failed', 'error');
});
  }
}
