import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { OthersExpense } from "src/app/shared/othersExpense.model";

@Component({
  selector: 'app-details-expense',
  templateUrl: './details-expense.component.html',
  styleUrls: ['./details-expense.component.css']
})
export class DetailsExpenseComponent implements OnInit {
  otherExpense: OthersExpense;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DetailsExpenseComponent>) { }

  ngOnInit() {
    this.otherExpense = this.data.otherExpense;
  }

}
