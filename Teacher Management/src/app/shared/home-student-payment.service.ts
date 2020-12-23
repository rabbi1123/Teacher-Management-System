import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class HomeStudentPaymentService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  getMonth(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').get();
  }
  createMonth(month){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').add(month);
  }
  createStudentList(id,data){
    var student = {
      studentID: data.id,
      payment: data.amount,
      Condition: 'unpaid',
    };
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').doc(`${id}`).collection('StudentList').add(student);   
  }
  getHomePayment(month){
     return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment', ref => ref.where("name", "==", month)).get();
  }
  getStudentList(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').doc(`${id}`).collection('StudentList').snapshotChanges();
 }
  getMonthList(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').get();
  }
  updatePayment(data,monthID,studentID){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').doc(`${monthID}`).collection('StudentList').doc(`${studentID}`).set(data);    
  }

  studentList(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('HomestudentPayment').doc(`${id}`).collection('StudentList').get();
 }
}
