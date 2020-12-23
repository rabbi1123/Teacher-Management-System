import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { Student } from "src/app/shared/student.model";
import { HomeService } from "src/app/shared/home.service";
import { CoursePaymentService } from "src/app/shared/course-payment.service";
import { HomeStudentPaymentService } from "src/app/shared/home-student-payment.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  listStudent: Student[];
  count: any;
  netAmount: number = 0;
  receiveAmount: number = 0;
  dueAmount: number = 0;
  constructor(private studentService: StudentService,
    private homeService: HomeService,
    private coursePaymentService: CoursePaymentService,
    private homeStudentPaymentService:HomeStudentPaymentService) { }

  ngOnInit() {
    this.studentService.getStudentList().subscribe(array => {
      this.listStudent = array.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Student;
      })
      this.count = this.listStudent.length;

      this.homeService.getMonthList().subscribe(payList => {
        payList.forEach(el => {
          this.homeService.studentList(el.id).subscribe(studentList => {
            studentList.forEach(student => {
              
              if(student.data().Condition == 'paid'){
                this.studentService.getStudentByID(student.data().studentID).subscribe(stu => {
                  var am = Number(stu.data().amount);
                  this.netAmount = this.netAmount + am;
                  this.receiveAmount = this.receiveAmount + am;
                })
                
              }
              else {
                this.studentService.getStudentByID(student.data().studentID).subscribe(stu => {
                  var am = Number(stu.data().amount);
                  this.netAmount = this.netAmount + am;
                  this.dueAmount = this.dueAmount + am;
                })
                
              }
              /* console.log(this.netAmount,this.receiveAmount,this.dueAmount); */

            })
          })
        })
      })

      this.coursePaymentService.listCoursePayment().subscribe(courses => {
        courses.forEach(el => {
          this.studentService.getStudentByID(el.data().StudentID).subscribe(stu => {
            var am = Number(stu.data().amount);
            this.netAmount = this.netAmount + am;
          })
          this.receiveAmount = this.receiveAmount + Number(el.data().Paid);
          this.dueAmount = this.dueAmount + Number(el.data().Due);
        })
      })

      this.homeStudentPaymentService.getMonthList().subscribe(payList => {
        payList.forEach(el => {
          this.homeStudentPaymentService.studentList(el.id).subscribe(studentList => {
            studentList.forEach(student => {
              
              if(student.data().Condition == 'paid'){
                this.studentService.getStudentByID(student.data().studentID).subscribe(stu => {
                  var am = Number(stu.data().amount);
                  this.netAmount = this.netAmount + am;
                  this.receiveAmount = this.receiveAmount + am;
                })
              }
              else {
                this.studentService.getStudentByID(student.data().studentID).subscribe(stu => {
                  var am = Number(stu.data().amount);
                  this.netAmount = this.netAmount + am;
                  this.dueAmount = this.dueAmount + am;
                })
              }

            })
          })
        })
      })

      
    });
    
  }

}
