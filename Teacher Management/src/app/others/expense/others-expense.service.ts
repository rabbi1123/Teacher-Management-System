import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OthersExpenseService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }
  
    getOtherExpenseList() {
      return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherExpense').snapshotChanges();
    }
    createOtherExpense(data){
      return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherExpense').add(data);
    }
    updateOtherExpense(data,id){
      return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherExpense').doc(`${id}`).update(data);
    }
    deleteOtherExpense(id) {
      return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherExpense').doc(`${id}`).delete();
    }

    otherExpenseList() {
      return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('OtherExpense').get();
    }
}
