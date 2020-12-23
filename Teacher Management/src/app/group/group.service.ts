import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private router: Router, private auth: AngularFireAuth, private db: AngularFirestore) { }

  createGroup(data){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').add(data);
  }
  
  createGroupStudent(data,id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${id}`).collection('StudentList').add(data);    
  }
  getGroupList(){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').snapshotChanges();    
  }
  getList(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${id}`).collection('StudentList').get();
  }
  
  updateGroup(id,data){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${id}`).update(data);
  }

  deleteStudentList(groupID,studentID){
    this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${groupID}`).collection('StudentList').doc(`${studentID}`).delete();
  }

  deleteGroup(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${id}`).delete();
  }

  getLength(id){
    return this.db.doc(`Teacher/${localStorage.getItem("userID")}`).collection('Group').doc(`${id}`).collection('StudentList').valueChanges();
  }
}
