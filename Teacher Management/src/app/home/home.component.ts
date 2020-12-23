import { Component, OnInit } from '@angular/core';
import { batchService } from "src/app/shared/batch.service";
import { Router } from "@angular/router";
import { Student } from "src/app/shared/student.model";
import { StudentService } from "src/app/student/student.service";
import { HomeService } from "src/app/shared/home.service";
import { HomeStudentPaymentService } from "src/app/shared/home-student-payment.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  studentList: Student[];

  constructor(private service: batchService, private router: Router, private homeService:HomeService, private homeStudentPaymentService:HomeStudentPaymentService, private studentService: StudentService) { }

  ngOnInit() {
    this.service.getUser().subscribe(user => {
      this.service.getTeacher(user.uid).subscribe(u => {
        this.user = u.data().Name;
      })
    });

    this.homeStudentPaymentService.getMonth().subscribe(list => {
      var m = new Date().toLocaleString('default', { month: 'long' });
      var monthList = [];
      list.forEach(month => {
        monthList.push(month.data().name);
      });
      if(!monthList.includes(m)) {
        var StudentList = new Array();
        this.studentService.getStudentList().subscribe(list => {
          StudentList = list.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            };
          })
        });
        var mo = {
          name: m
        }
        this.homeStudentPaymentService.createMonth(mo).then(month => {
          StudentList.forEach(el => {
            if(el.type == 'homeTution'){
              this.homeStudentPaymentService.createStudentList(month.id,el);
            }
          })
          
        })
      }
    })
    

    this.homeService.getMonth().subscribe(list => {
      var m = new Date().toLocaleString('default', { month: 'long' });
      var monthList = [];
      list.forEach(month => {
        monthList.push(month.data().name);
      });
      if(!monthList.includes(m)){
        this.studentService.getStudentList().subscribe(list => {
          this.studentList = list.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Student;
          })
        });

        var mo = {
          name: m
        }
        this.homeService.createMonth(mo).then(month => {
          this.studentList.forEach(el => {
            if(el.type == 'monthly'){
              this.homeService.createStudentList(month.id,el);
            }
          })
          
        })
      }
      
    })
  }

  toogleButton(){
    document.querySelector('.mobile_nav_items').classList.toggle('active');
  }

  logout(){
    this.service.logout();
  }

}
