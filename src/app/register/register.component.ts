import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FbserviceService } from '../services/fbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(public formbuilder: FormBuilder,public route: Router,public fb: FbserviceService) { 
    this.formRegister = formbuilder.group({
      Name: ['', Validators.required],
      Mail: ['', Validators.required],
      pass: ['', Validators.required,],
      repass: ['', Validators.required,]
  });
  }
   
  ngOnInit(): void {
    
  }
  onSubmit =()=>{
    console.log(this.formRegister.value);
    this.fb.registerWithMailPass(this.formRegister.value)
  }
}
