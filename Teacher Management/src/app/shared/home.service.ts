import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  getMonth(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').get();
  }
  createMonth(month){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').add(month);
  }
  createStudentList(id,data){
    var student = {
      studentID: data.id,
      payment: data.amount,
      Name: data.fullName,
      Condition: 'unpaid',
    };
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').doc(`${id}`).collection('StudentList').add(student);   
  }
  getMonthList(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').get();
  }
  getMonthlyPayment(month){

    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment', ref => ref.where("name", "==", month)).get();
    
  }
  getStudentList(id){
     return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').doc(`${id}`).collection('StudentList').snapshotChanges();
  }
  updatePayment(data,monthID,studentID){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').doc(`${monthID}`).collection('StudentList').doc(`${studentID}`).set(data);    
  }

  studentList(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('MonthlyPayment').doc(`${id}`).collection('StudentList').get();
 }
}
