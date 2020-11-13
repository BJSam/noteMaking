import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {FbserviceService} from '../services/fbservice.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  form: FormGroup;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Type the your notes here!'
}
  constructor(public formbuilder: FormBuilder,  private firestore: AngularFirestore, public fb: FbserviceService) {
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
    }
  });
  ngOnInit(): void {
  }
  addData = () => {
   if (this.form.valid && this.fb.user.uid != null){
    
     return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection(this.fb.user.uid)
          .add({
            ...this.form.value,
             date: new Date()
          }, )
          .then(res => {
            console.log(res);
            Swal.close();
            this.Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
});
            this.form.reset();

          }, err => {reject(err);  Swal.close(); Swal.fire({icon: 'error', title: 'coudn\'t add notes'}); });
  });
   }
   else{
     console.log(this.fb.user.uid);
   }
  }
  onSubmit = () => {
    console.log({...this.form.value, date: new Date()});    
    Swal.fire({
      title: 'adding notes',
      text: 'Please wait',
      imageUrl: '../../assets/img/Spinner-1s-200px.gif',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.addData();
  }
  
}
