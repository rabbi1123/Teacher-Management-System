import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class OthersIncomeService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  getOtherIncomeList() {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherIncome').snapshotChanges();
  }
  createOtherIncome(data){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherIncome').add(data);
  }
  updateOtherIncome(data,id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherIncome').doc(`${id}`).update(data);
  }
  deleteOtherIncome(id) {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherIncome').doc(`${id}`).delete();
  }

  otherIncomeList() {
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherIncome').get();
  }
}
