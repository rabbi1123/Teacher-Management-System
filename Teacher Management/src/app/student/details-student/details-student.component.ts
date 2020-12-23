import { Component, OnInit, Inject } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Student } from "src/app/shared/student.model";

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {

  constructor(private service: StudentService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DetailsStudentComponent>) { }

  student: Student;
  
  ngOnInit() {
    this.student = this.data.student;
  }

}
