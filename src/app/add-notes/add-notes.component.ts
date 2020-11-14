import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FbserviceService } from '../services/fbservice.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent implements OnInit {
  form: FormGroup;
  public userId$: any;
  fetchedNotes: any;
  fetchedNotesTitle: any;
  public fetchedNotesId: any;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Type your notes here!',
  };
  // tslint:disable-next-line: max-line-length
  constructor(
    public formbuilder: FormBuilder,
    private db: AngularFirestore,
    private firestore: AngularFirestore,
    private Activeroute: ActivatedRoute,
    public fb: FbserviceService,
    public route: Router
  ) {
    this.form = formbuilder.group({
      title: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  ngOnInit(): void {
    this.Activeroute.params.subscribe((params) => {
      this.userId$ = params.id;
      this.fetchedNotes = params.notes;
      this.fetchedNotesTitle = params.title;
      this.fetchedNotesId = params.id;
    });
    if (this.userId$ && this.fb.user) {
      this.setSingleData();
    } else {
      this.form.reset();
    }
  }
  setSingleData = async () => {
    this.form.patchValue({
      title: this.fetchedNotesTitle,
      notes: this.fetchedNotes,
    });
  };
  addData = () => {
    if (
      this.form.valid &&
      this.fb.user.uid != null &&
      this.fb.user.emailVerified
    ) {
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection(this.fb.user.uid)
          .add({
            ...this.form.value,
            date: new Date(),
            id:
              this.fb.user.uid +
              '|::|' +
              Math.random().toString(36).substring(7),
          })
          .then(
            (res) => {
              console.log(res);
              Swal.close();
              this.Toast.fire({
                icon: 'success',
                title: 'Signed in successfully',
              });
              this.form.reset();
            },
            (err) => {
              reject(err);
              Swal.close();
              Swal.fire({ icon: 'error', title: "coudn't add notes" });
            }
          );
      });
    } else {
      if (!this.fb.user.emailVerified) {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          title: 'please verify your mail:' + this.fb.user.email,
          showCancelButton: true,
          confirmButtonText: `Get verification mail`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.fb.resendVerificationMail();
          }
        });
      }
      console.log(this.fb.user.uid);
    }
  };
  onSubmit = (id) => {
    if (!id) {
      console.log({ ...this.form.value, date: new Date() });
      Swal.fire({
        title: 'adding notes',
        text: 'Please wait',
        imageUrl: '../../assets/img/Spinner-1s-200px.gif',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      this.addData();
    } else {
      console.log({ ...this.form.value, date: new Date() });
      Swal.fire({
        title: 'saving your edits',
        text: 'Please wait',
        imageUrl: '../../assets/img/Spinner-1s-200px.gif',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      this.db
        .collection(this.fb.user.uid)
        .ref.where('id', '==', id)
        .get()
        .then((doc) => {
          if (doc.size === 1) {
            doc.forEach((d) => {
              d.ref
                .update({ ...this.form.value, date: new Date() })
                .then((ref) => {
                  this.Toast.fire({
                    icon: 'success',
                    title: 'Update Success',
                  });
                });
            });
          }
        });
    }
  };
}
