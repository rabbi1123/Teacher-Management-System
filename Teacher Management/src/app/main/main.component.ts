import { Component, OnInit } from '@angular/core';
import { Student } from "src/app/shared/student.model";
import { StudentService } from "src/app/student/student.service";
import { HomeService } from "src/app/shared/home.service";
import { CoursePaymentService } from "src/app/shared/course-payment.service";
import { HomeStudentPaymentService } from "src/app/shared/home-student-payment.service";
import { OthersIncomeService } from "src/app/others/income/othersIncome.service";
import { OthersExpenseService } from "src/app/others/expense/others-expense.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  listStudent: Student[];
  count: any;
  netAmount: number = 0;
  receiveAmount: number = 0;
  dueAmount: number = 0;
  totalOtherIncome: number = 0;
  totalExpense: number = 0;
  constructor(private studentService: StudentService,
    private homeService: HomeService,
    private coursePaymentService: CoursePaymentService,
    private homeStudentPaymentService:HomeStudentPaymentService,
    private othersIncomeService: OthersIncomeService,
    private othersExpenseService: OthersExpenseService) { }

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
                var am = Number(student.data().payment);
                this.netAmount = this.netAmount + am;
                this.receiveAmount = this.receiveAmount + am;
              }
              else {
                var am = Number(student.data().payment);
                this.netAmount = this.netAmount + am;
                this.dueAmount = this.dueAmount + am;
              }

            })
          })
        })
      })

      this.coursePaymentService.listCoursePayment().subscribe(courses => {
        courses.forEach(el => {
          this.receiveAmount = this.receiveAmount + Number(el.data().Paid);
          this.dueAmount = this.dueAmount + Number(el.data().Due);
          this.netAmount = this.netAmount + (Number(el.data().Paid) + Number(el.data().Due));
        })
      })

      this.homeStudentPaymentService.getMonthList().subscribe(payList => {
        payList.forEach(el => {
          this.homeStudentPaymentService.studentList(el.id).subscribe(studentList => {
            studentList.forEach(student => {
              
              if(student.data().Condition == 'paid') {
                var am = Number(student.data().payment);
                this.netAmount = this.netAmount + am;
                this.receiveAmount = this.receiveAmount + am;
              }
              else {
                var am = Number(student.data().payment);
                this.netAmount = this.netAmount + am;
                this.dueAmount = this.dueAmount + am;
              }

            })
          })
        })
      })

      this.othersIncomeService.otherIncomeList().subscribe(list => {
        list.forEach(el => {
          this.totalOtherIncome = this.totalOtherIncome + el.data().amount;
        })
      })

      this.othersExpenseService.otherExpenseList().subscribe(list => {
        list.forEach(el => {
          this.totalExpense = this.totalExpense + el.data().amount;
        })
      })
      
    });
  }

}
