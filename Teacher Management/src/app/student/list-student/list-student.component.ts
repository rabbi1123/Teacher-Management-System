import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { Student } from "src/app/shared/student.model";
import { Observable, Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateStudentComponent } from "src/app/student/create-student/create-student.component";
import { DetailsStudentComponent } from "src/app/student/details-student/details-student.component";
import { CoursePaymentService } from "src/app/shared/course-payment.service";
declare var $;

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnDestroy, OnInit {
  /* @ViewChild('dataTable', {static: true}) table; */
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  list: Student[];
  dtTrigger = new Subject();

  constructor(private studentService: StudentService, private coursePaymentService: CoursePaymentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "retrieve": true,
      "paging": false
    };

    this.studentService.getStudentList().subscribe(array => {
      this.list = array.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Student;
      })
      this.dtTrigger.next();

      /* this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions); */
    });

    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

  AddOrEditStudent(student: Student){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { student };
    this.dialog.open(CreateStudentComponent,dialogConfig);
  }

  details(student: Student){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = { student };
    this.dialog.open(DetailsStudentComponent,dialogConfig);
  }

  deleteStudent(student: Student){
    if(student.type == 'course'){
      this.coursePaymentService.getCoursePayment(student.id).subscribe(stu => {
        this.coursePaymentService.deleteCoursePayment(stu.docs[0].id);
      })
    }
    
    this.studentService.deleteStudent(student.id);
    
  }

}
