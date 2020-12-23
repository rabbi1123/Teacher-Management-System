import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { CoursePaymentService } from "src/app/shared/course-payment.service";

@Component({
  selector: 'app-update-course-payment',
  templateUrl: './update-course-payment.component.html',
  styleUrls: ['./update-course-payment.component.css']
})
export class UpdateCoursePaymentComponent implements OnInit {
  student: any;
  amount: any;
  valid: boolean = false;

  constructor(private coursePaymentService: CoursePaymentService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UpdateCoursePaymentComponent >) { }

  ngOnInit() {
    this.student = this.data.student;
  }

  savePayment() {
    if(this.amount == null || this.amount == '' || (Number(this.amount) > Number(this.student.due)) ) {
      this.valid = true;
    }
    else {
      this.coursePaymentService.coursePayment(this.student.id).subscribe(el => {
        var pay = {
          Due: (Number(el.data().Due) - Number(this.amount)).toString(),
          Paid: (Number(el.data().Paid) + Number(this.amount)).toString(),
          StudentID: el.data().StudentID
        }
        this.coursePaymentService.updatePayment(pay,el.id).then(() => {
          this.dialogRef.close();
          document.location.reload(true);
        })
      })
    }
    
  }

}
