import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbserviceService } from '../services/fbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( public route: Router, public fb: FbserviceService,) { }

  ngOnInit(): void {
    if(!this.fb.user){
      this.route.navigate(['']);
    }
  }
  goTo = (routeName: string) => {
    this.route.navigate([routeName]);
      }
    gotostudent =(uid,name)=>{
      this.route.navigate(['student',{uid,name}])
    }
}
