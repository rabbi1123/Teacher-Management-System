import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursePaymentService } from "src/app/shared/course-payment.service";
import { StudentService } from "src/app/student/student.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list-course-payment',
  templateUrl: './list-course-payment.component.html',
  styleUrls: ['./list-course-payment.component.css']
})
export class ListCoursePaymentComponent implements OnInit {
  studentList: any = [];
  constructor(private router: Router ,private coursePaymentService: CoursePaymentService, private studentService: StudentService) { }

  ngOnInit() {

    this.coursePaymentService.listCoursePayment().subscribe(list => {
      var m = [];
      list.forEach(el => {
        this.studentService.getStudentByID(el.data().StudentID).subscribe(student => {
          let a = {
            id: el.id,
            studentID: student.id,
            name: student.data().fullName,
            amount: student.data().amount,
            paid: el.data().Paid,
            due: el.data().Due
          }
          m.push(a);
        });
      });
      this.studentList = m;
      
    })
  }

  details(student) {
    this.router.navigate(['DetailsCoursePayment', student.id]);
  }

}
