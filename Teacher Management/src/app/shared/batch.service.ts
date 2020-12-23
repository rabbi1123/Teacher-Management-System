import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class batchService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  private loginError = new BehaviorSubject<string>("");
  loginError$ = this.loginError.asObservable();

  newUser: any;
  userID: any;

  constructor(private fireauth: AngularFireAuth, private db: AngularFirestore, private router: Router) { 
    /* this.fireauth.authState.subscribe(auth => {
      this.authstate = auth;
    }) */
  }

  getUser() {
    return this.fireauth.authState;
    /* this.user = this.fireauth.authState;
    return this.db.doc(`Teacher/${user.uid}`).get(); */
  }
  getTeacher(id){
    return this.db.doc(`Teacher/${id}`).get();
  }

  login(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password)
      .then(userCredential => {
        if(userCredential){
          localStorage.setItem("userID", userCredential.user.uid);
          this.loginError.next("");
          this.router.navigate(['/Home']);
        }
      }).catch(error => {
        this.loginError.next(error);
      })
  }

  createTeacher(user){
    this.fireauth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        this.newUser = user;

        /* credential.user.updateProfile({
          Name: user.userName
        }); */

        this.insertTeacherData(credential).then(() =>{
          this.eventAuthError.next("");
          this.fireauth.signInWithEmailAndPassword(user.email, user.password)
            .then((user) =>{
              localStorage.setItem("userID", user.user.uid);
              this.router.navigate(['/Home']);
            })
        });

      }).catch(error => {
        this.eventAuthError.next(error);
      })
  }

  insertTeacherData(userCredential: firebase.auth.UserCredential){
    return this.db.doc(`Teacher/${userCredential.user.uid}`).set({
      Name: this.newUser.userName,
      Phone: this.newUser.phone,
      Email: this.newUser.email
    })
  }

  logout(){
    localStorage.removeItem("userID");
    this.fireauth.signOut();
    this.router.navigate(['/user']);
  }

}
