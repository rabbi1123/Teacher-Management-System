import { Component, OnInit, Inject } from '@angular/core';
import { Group } from "src/app/shared/group.model";
import { StudentService } from "src/app/student/student.service";
import { GroupService } from "src/app/group/group.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  group: Group;
  constructor(private studentService: StudentService, private groupService: GroupService, 
    private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CreateGroupComponent>) { }
  
  items: any;
  selectedItems: any = [];
  isValid: boolean = true;

  ngOnInit() {
    if(this.data.group == null) {
      this.studentService.getStudentList().subscribe(array => {
        this.items = array.map(item => {
          return {
            id: item.payload.doc.id,
            name: item.payload.doc.data().fullName
          }
        })
      });
      this.group = {
        id: null,
        name: '',
        date: new Date().toLocaleDateString()
      }
    } else {
      this.studentService.getStudentList().subscribe(array => {
        this.items = array.map(item => {
          return {
            id: item.payload.doc.id,
            name: item.payload.doc.data().fullName
          }
        })
      });

      this.group = Object.assign({},this.data.group);
      this.groupService.getList(this.data.group.id).subscribe(list => {
            var m = [];
            list.forEach(el => {
            let a = {
              id: el.id,
              name: el.data().name
            };
            m.push(a);
          });
          this.selectedItems = m;
      });
    }
    
  }

  groupCreate(form: NgForm) {
    if(this.validateForm(form)) {
      
      if(form.value.id == null) {
        var da = {};
        da['name'] = form.value.name;
        da['date'] = form.value.date;
    
        this.groupService.createGroup(da).then(group => {
          form.value.list.forEach(element => {
            this.groupService.createGroupStudent(element,group.id);
          });
          this.dialogRef.close();
        })
      } else {
       // let d = Object.assign({}, form.value);
       /* let arrayList = [];
       form.value.list.forEach(el => {
         arrayList.push(el);
       }); */
       
        this.groupService.getList(form.value.id).subscribe(el => {
          el.forEach(e => {
            this.groupService.deleteStudentList(form.value.id, e.id)
          });
        });
        this.groupService.deleteGroup(form.value.id);

        /* if(arrayList.length > 0) {
          arrayList.forEach(element => {
            this.groupService.createGroupStudent(element,form.value.id);
          });
        } */
          
        var da = {};
        da['name'] = form.value.name;
        da['date'] = form.value.date;
        
        this.groupService.createGroup(da).then(group => {
          form.value.list.forEach(element => {
            this.groupService.createGroupStudent(element,group.id);
          });
          this.dialogRef.close();
        })

      }

      
    }
    
  }
  validateForm(form: NgForm){
    this.isValid = true;
    if(form.value.name == '' || form.value.name == null){
      this.isValid = false;
    }

    return this.isValid;
  }

}
