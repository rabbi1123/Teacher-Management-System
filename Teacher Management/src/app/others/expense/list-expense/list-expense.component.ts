import { Component, OnInit, OnDestroy } from '@angular/core';
import { OthersExpenseService } from "src/app/others/expense/others-expense.service";
import { MatDialog } from "@angular/material/dialog";
import { OthersExpense } from "src/app/shared/othersExpense.model";
import { MatDialogConfig } from "@angular/material/dialog";
import { DetailsExpenseComponent } from "src/app/others/expense/details-expense/details-expense.component";
import { CreateExpenseComponent } from "src/app/others/expense/create-expense/create-expense.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnDestroy, OnInit {
  otherExpenseList: OthersExpense[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private othersExpenseService: OthersExpenseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "retrieve": true,
      "paging": false
    };

    this.othersExpenseService.getOtherExpenseList().subscribe(array => {
      this.otherExpenseList = array.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as OthersExpense;
      })
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  AddOrEditExpense(otherExpense: OthersExpense){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { otherExpense };
    this.dialog.open(CreateExpenseComponent,dialogConfig);
  }
  
  details(otherExpense: OthersExpense) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.data = { otherExpense };
    this.dialog.open(DetailsExpenseComponent,dialogConfig);
  }

  deleteExpense(id) {
    this.othersExpenseService.deleteOtherExpense(id);
  }

}
