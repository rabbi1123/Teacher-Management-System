import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from "src/app/group/group.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateGroupComponent } from "src/app/group/create-group/create-group.component";
import { DetailsGroupComponent } from "src/app/group/details-group/details-group.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnDestroy, OnInit {
  groups: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private groupService: GroupService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "retrieve": true,
      "paging": false
    };

    this.groupService.getGroupList().subscribe(array => {
      this.groups = array.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        }
      })

      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  AddOrEditGroup(group: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { group };
    this.dialog.open(CreateGroupComponent,dialogConfig);
  }

  details(group: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { group };
    this.dialog.open(DetailsGroupComponent,dialogConfig);
  }

  deleteGroup(id){
    this.groupService.getList(id).subscribe(el => {
      el.forEach(e => {
        this.groupService.deleteStudentList(id, e.id)
      });
    });
    this.groupService.deleteGroup(id);
  }
}
