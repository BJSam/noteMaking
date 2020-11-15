import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class FbserviceService {
  constructor(
    public Auth: AngularFireAuth,
    private db: AngularFirestore,
    public route: Router
  ) {
    Auth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        if (user.emailVerified) {
          this.isuserVerified = true;
        } else {
          this.isuserVerified = false;
        }
        this.route.navigate(['home']);
        this.db
          .collection(user.uid)
          .valueChanges()
          .subscribe(async (dt) => {
            this.fetchedNotes = dt;
          });
      }
    });
  }
  user: any;
  role: any;
  fetchedNotes: any;
  Students: any;
  pleaseWait = false;
  isuserVerified: boolean;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  LoginWithGooogle: any = async () => {
    Swal.fire({
      title: 'logging you in',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    const provider = new firebase.default.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.Auth.signInWithPopup(provider)
      .then((res) => {
        Swal.close();
        Swal.fire('Good to see you', 'Login Success', 'success');
      })
      .catch((e) => {
        console.error(e);
        Swal.close();
        Swal.fire('Oops...', 'Login Failed', 'error');
      });
  };
  registerWithMailPass = ({ Name, Mail, pass }) => {
    Swal.fire({
      title: 'Registering',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    this.Auth.createUserWithEmailAndPassword(Mail.trim(), pass)
      .then((value) => {
        if (value.user) {
          const dt = {
            uid: value.user.uid,
            name: Name,
            role: 'student',
          };
          this.addUserProfile(dt);
          value.user.updateProfile({
            displayName: Name,
          });
        }
        console.log('Success!', value);
        Swal.close();
        Swal.fire('Good to see you', 'Login Success', 'success');
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'failed to signup',
          text: err.message,
        });
      });
  };
  resendVerificationMail = () => {
    Swal.fire({
      title: 'sending verification mail',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    this.Auth.currentUser.then((user) => {
      if (!user.emailVerified && !this.user.emailVerified) {
        user
          .sendEmailVerification()
          .then((rs) => {
            Swal.close();
            this.Toast.fire({
              icon: 'success',
              title: 'Sent mail, please reload page',
            });
          })
          .catch((e) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Failed to send verification mail',
              text: e.message,
            });
          });
      } else {
        if (this.user.emailVerified) {
          this.isuserVerified = true;
        }
      }
    });
  };
  LoginWithEmailPass = ({ Mail, pass }) => {
    Swal.fire({
      title: 'logging you in',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    this.Auth.signInWithEmailAndPassword(Mail.trim(), pass)
      .then((res) => {
        Swal.close()
        Swal.fire('Good to see you', 'Login Success', 'success');
      })
      .catch((e) => {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'login failed',
          text: e.message,
        });
      });
  };
  deleteEditRecord = async (id, type, data?) => {
    let query = await this.db
      .collection(this.user.uid)
      .ref.where('id', '==', id)
      .get()
      .then((q) => {
        if (type === 'delete') {
          q.forEach((doc) => {
            doc.ref.delete();
          });
        } else if (type === 'edit' && data) {
          q.forEach((doc) => {
            doc.ref.delete();
          });
        } else {
          alert('operation not found');
        }
      });
    this.Toast.fire({
      icon: 'success',
      title: 'Deleted',
    });
  };
  addUserProfile = ({ uid, name, role }) => {
    this.db.collection('Users').add({
      Uid: uid,
      Name: name,
      Role: role,
    });
  };
  getRole = async () => {
    await this.db
      .collection('Users')
      .ref.where('Role', '==', 'teacher')
      .get()
      .then((doc) => {
        doc.forEach(async (d) => {
          if (d.data().Uid === this.user.uid) {
            this.role = 'teacher';
            await this.db
              .collection('Users')
              .valueChanges()
              .subscribe(async (dt) => {
                console.log(dt);
                this.Students = dt.filter((s: any) => s.Role !== 'teacher');
              });
          } else {
            this.role = 'student';
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getNotes = async (id) => {
    await this.db
      .collection(id)
      .valueChanges()
      .subscribe(async (dt) => {
        return dt;
      });
  };
}
