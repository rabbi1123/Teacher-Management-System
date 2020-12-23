import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class CoursePaymentService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  createCoursePayment(student){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment').add(student);
  }
  getCoursePayment(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment', ref => ref.where("StudentID", "==", id)).get();
  }
  updatePayment(data,id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment').doc(`${id}`).set(data);
  }
  listCoursePayment(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment').get();
  }
  coursePayment(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment').doc(`${id}`).get();
  }
  deleteCoursePayment(id: string) {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('CoursePayment').doc(`${id}`).delete();
  }

}
