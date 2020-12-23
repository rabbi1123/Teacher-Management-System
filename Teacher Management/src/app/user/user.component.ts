import { Component, OnInit } from '@angular/core';
import { batchService } from "src/app/shared/batch.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: batchService) { }

  authError: any;
  loginerror: any;

  ngOnInit() {
    this.service.eventAuthError$.subscribe(data => {
      this.authError = data;
    });

    this.service.loginError$.subscribe(data => {
      this.loginerror = data;
    });
  }

  onSignUPbtn(){
    document.querySelector(".contain").classList.add("sign-up-mode");
  }

  onSignINbtn(){
    document.querySelector(".contain").classList.remove("sign-up-mode");
  }

  createTeacher(regForm){
    this.service.createTeacher(regForm.value);
  }

  login(form){
    this.service.login(form.value.email,form.value.password);
  }

}
