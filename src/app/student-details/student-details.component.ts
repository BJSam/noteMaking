import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  userId$: any;
  notes: any;
  Name: any;
  constructor(  private Activeroute: ActivatedRoute,private db: AngularFirestore,public route: Router,) { }

  ngOnInit(): void {
    this.Activeroute.params.subscribe(async (params) => {
      this.userId$ = params.uid;
      this.Name = params.name;
      if(params.uid){
       await this.db
          .collection(params.uid)
          .valueChanges()
          .subscribe(async (dt) => {
            this.notes = dt;
          });
      }
    });
  }
  getDate = (date: any) => {
    return new Date(date * 1000);
  }
}
