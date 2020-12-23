import { Component, OnInit, Inject } from '@angular/core';
import { Student } from "src/app/shared/student.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentService } from "src/app/student/student.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CoursePaymentService } from "src/app/shared/course-payment.service";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private service: StudentService, private coursePaymentService: CoursePaymentService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CreateStudentComponent>) { }

  student: Student;
  isValid: boolean = true;
  status: string;

  ngOnInit() {
    if(this.data.student == null){
      this.status = 'Create Student';
      this.student = {
        id: null,
        fullName: '',
        email: '',
        phone: null,
        guardianName: '',
        class: '',
        type: '',
        course: '',
        amount: null,
        admissionFee: null,
        date: new Date().toLocaleDateString()
      }
    }else {
      this.status = 'Edit Student';
      this.student = Object.assign({},this.data.student);
    }

    
  }

  studentCreate(form: NgForm){
    if(this.validateForm(form.value)){
      let data = Object.assign({}, form.value);
      delete data.id;
      if(form.value.id == null){
        this.service.createStudent(data).then(stu => {
          if(form.value.type == 'course') {
            var student = {
              StudentID: stu.id,
              Paid: null,
              Due: form.value.amount
            };
            this.coursePaymentService.createCoursePayment(student).then(() => {
              this.dialogRef.close();
            });
          } else {
            this.dialogRef.close();
          }

        }).catch(error => {
          alert("Something is Error...");
        })
      }else {
        this.service.updateStudent(data,form.value.id).then(stu => {
          /* this.dialogRef.close(); */
          /* list.docs[0].id */
          if(form.value.type == 'course') {
            this.coursePaymentService.getCoursePayment(form.value.id).subscribe(list => {
              var am = Number(list.docs[0].data().Due) + Number(list.docs[0].data().Paid);
              if(Number(form.value.amount) == am){
                this.dialogRef.close();
              }
              else {
                var x = Number(form.value.amount) - am;
                var mainDue = Number(list.docs[0].data().Due) + x;

                var course = {
                  Due: mainDue.toString(),
                  Paid: list.docs[0].data().Paid,
                  StudentID: list.docs[0].data().StudentID
                }
                this.coursePaymentService.updatePayment(course,list.docs[0].id).then(() => {
                  this.dialogRef.close();
                })
              }

              /* console.log(list.docs[0].data().Due,list.docs[0].data().Paid); */
            })
          } else {
            this.dialogRef.close();
          }
          

        }).catch(error => {
          alert("Something is Error...");
        })
      }
      /* data['fullName'] = form.value.fullName;
      data['email'] = form.value.email;
      data['phone'] = form.value.phone; */
      
    }
  }

  validateForm(student: Student){
    this.isValid = true;
    if(student.fullName == '' || student.fullName == null){
      this.isValid = false;
    }
    else if(student.phone == null){
      this.isValid = false;
    }
    else if(student.type == '' || student.type== null){
      this.isValid = false;
    }
    else if(student.amount == null){
      this.isValid = false;
    }
    return this.isValid;
  }
}
