import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CoursePaymentService } from "src/app/shared/course-payment.service";
import { StudentService } from "src/app/student/student.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UpdateCoursePaymentComponent } from "src/app/payment/CoursePayment/update-course-payment/update-course-payment.component";

@Component({
  selector: 'app-details-course-payment',
  templateUrl: './details-course-payment.component.html',
  styleUrls: ['./details-course-payment.component.css']
})
export class DetailsCoursePaymentComponent implements OnInit {
  
  student: any = {};
  constructor(private route: ActivatedRoute,private coursePaymentService: CoursePaymentService, private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.getStudent(id);
    })
  }
  getStudent(id) {
    this.coursePaymentService.coursePayment(id).subscribe(stu => {
      this.studentService.getStudentByID(stu.data().StudentID).subscribe(student => {
         this.student = {
          id: stu.id,
          studentID: student.id,
          name: student.data().fullName,
          amount: student.data().amount,
          class: student.data().class,
          course: student.data().course,
          date: student.data().date,
          paid: stu.data().Paid,
          due: stu.data().Due
        }
      })
    })
  }

  update(student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = { student };
    this.dialog.open(UpdateCoursePaymentComponent,dialogConfig);
  }

}
