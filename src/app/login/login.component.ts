import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FbserviceService } from '../services/fbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formRegister: FormGroup;
  constructor(public formbuilder: FormBuilder, public route: Router,public fb: FbserviceService) { 
    this.formRegister = formbuilder.group({
      Mail: ['', Validators.required],
      pass: ['', Validators.required,],
  });
  }

  ngOnInit(): void {
  }
  onSubmit =()=>{
    this.fb.LoginWithEmailPass(this.formRegister.value)
  }
}
