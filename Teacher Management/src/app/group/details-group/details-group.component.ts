import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from "src/app/group/group.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-details-group',
  templateUrl: './details-group.component.html',
  styleUrls: ['./details-group.component.css']
})
export class DetailsGroupComponent implements OnInit {

  constructor(private groupService: GroupService, 
    private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DetailsGroupComponent>) { }

  group: any;
  items: any = [];
  ngOnInit() {
    this.group = this.data.group;

    this.groupService.getList(this.data.group.id).subscribe(list =>{
      var m = [];
      list.forEach(el => {
      let a = {
        id: el.id,
        name: el.data().name
      };
      m.push(a);
    });
    this.items = m;
    })
  }

}
