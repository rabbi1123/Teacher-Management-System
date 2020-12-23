import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeStudentPaymentService } from "src/app/shared/home-student-payment.service";
import { StudentService } from "src/app/student/student.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-home-student-payment',
  templateUrl: './home-student-payment.component.html',
  styleUrls: ['./home-student-payment.component.css']
})
export class HomeStudentPaymentComponent implements OnInit {
  paymentList: any;
  month: any;
  monthList: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private homeStudentPaymentService: HomeStudentPaymentService, private studentService: StudentService) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "paging": false
    };

    var mon = new Date().toLocaleString('default', { month: 'long' });
    this.month = mon;
    this.listByMonth(mon);

    this.homeStudentPaymentService.getMonthList().subscribe(list => {
      list.forEach(el => {
        this.monthList.push(el.data().name);
      })
    })
    
  }

  listByMonth(mo) {
    this.homeStudentPaymentService.getHomePayment(mo).subscribe(pay => {
      this.homeStudentPaymentService.getStudentList(pay.docs[0].id).subscribe(list => {
        var c = new Array();
        list.forEach(el => {
          this.studentService.getStudentByID(el.payload.doc.data().studentID).subscribe(stu => {
            var m = {
              id: el.payload.doc.id,
              studentID: el.payload.doc.data().studentID,
              name: stu.data().fullName,
              Condition: el.payload.doc.data().Condition
            }
            c.push(m);
          })
        })
        this.paymentList = c;
        this.dtTrigger.next();
      })
    })
  }

  getMonth(type) {
    this.listByMonth(type);
  }

  changePayment(student) {
    var data;
    if(student.Condition == 'unpaid'){
      data = {
        studentID: student.studentID,
        Condition: 'paid',
        Date: new Date().toLocaleDateString()
      }
    } else {
      data = {
        studentID: student.studentID,
        Condition: 'unpaid',
      }
    }

    this.homeStudentPaymentService.getHomePayment(this.month).subscribe(pay => {
      this.homeStudentPaymentService.updatePayment(data,pay.docs[0].id,student.id);
    });

  }

}
