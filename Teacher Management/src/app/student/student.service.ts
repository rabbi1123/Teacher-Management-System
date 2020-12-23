import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { batchService } from "src/app/shared/batch.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private router: Router, private auth: AngularFireAuth, private db: AngularFirestore,private mainService: batchService) { }

  createStudent(data) {
    /* this.auth.authState.subscribe(user => {
      return this.db.doc(`Teacher/${user.uid}`).collection('Student').add(data).then(res => {
        this.router.navigate(['/Home']);
      }).catch(error => {
        console.log(error);
      })
    }) */

    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Student').add(data);
  }

  getStudentList() {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Student').snapshotChanges();
  }

  updateStudent(data,id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Student').doc(`${id}`).update(data);
  }

  deleteStudent(id: string) {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Student').doc(`${id}`).delete();
  }
  getStudentByID(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Student').doc(`${id}`).get();
  }
}
