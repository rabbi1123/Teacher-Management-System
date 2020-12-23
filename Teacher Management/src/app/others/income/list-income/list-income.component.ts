import { Component, OnInit, OnDestroy } from '@angular/core';
import { OthersIncomeService } from "src/app/others/income/othersIncome.service";
import { OthersIncome } from "src/app/shared/othersIncome.model";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { CreateIncomeComponent } from "src/app/others/income/create-income/create-income.component";
import { DetailsIncomeComponent } from "src/app/others/income/details-income/details-income.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list-income',
  templateUrl: './list-income.component.html',
  styleUrls: ['./list-income.component.css']
})
export class ListIncomeComponent implements OnDestroy, OnInit {
  otherIncomeList: OthersIncome[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private othersIncomeService: OthersIncomeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "retrieve": true,
      "paging": false
    };

    this.othersIncomeService.getOtherIncomeList().subscribe(array => {
      this.otherIncomeList = array.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as OthersIncome;
      })
      this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  AddOrEditIncome(otherIncome: OthersIncome){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { otherIncome };
    this.dialog.open(CreateIncomeComponent,dialogConfig);
  }

  details(otherIncome: OthersIncome) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { otherIncome };
    this.dialog.open(DetailsIncomeComponent,dialogConfig);
  }

  deleteIncome(id) {
    this.othersIncomeService.deleteOtherIncome(id);
  }

}
