import { Router  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FbserviceService } from '../services/fbservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit {
  user: any = null;
  constructor(private auth: AngularFireAuth, public fb: FbserviceService, public route: Router  ) { }
  Logout = () => {
    if (this.user){
      this.auth.signOut().then(res => {console.log(res); alert('loggedOut');  this.route.navigate(['home']);});
    }
   }
  ShowProfileDetails = () => {
    if (this.user != null){
      Swal.fire({
        title: '<strong><u>Profile</u></strong>',
        icon: 'info',
        html: `<table class="infoTable">
        <tr>
        <td>
        Name
        </td>
        <td>
        :
        </td>
        <td>
        ${this.user.displayName}
        </td>
        </tr>
        <tr>
        <td>
        Email
        </td>
        <td>
        :
        </td>
        <td>
        ${this.user.email}
        </td>
        </tr>
        </table>` ,
      })
    }
  }
  ngOnInit(): void {
    this.auth.user.subscribe((dta) => {this.user = dta; });
    if (this.user){
    this.route.navigate(['home']);
   }
  }
  goTo = (routeName: string) => {
this.route.navigate([routeName]);
  }
}
