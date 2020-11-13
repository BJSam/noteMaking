import { Component, OnInit } from '@angular/core';
import {FbserviceService} from './services/fbservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Note Making';
  user: any = null;
  constructor(public fb: FbserviceService, private auth: AngularFireAuth){}
  Logout = () => {
  if (this.user){
    this.auth.signOut().then(res => {console.log(res); alert('loggedOut'); });
  }
 }

 ngOnInit(): void{
  this.auth.user.subscribe((dta) => {this.user = dta; });

 }
}
