import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { OthersIncome } from "src/app/shared/othersIncome.model";

@Component({
  selector: 'app-details-income',
  templateUrl: './details-income.component.html',
  styleUrls: ['./details-income.component.css']
})
export class DetailsIncomeComponent implements OnInit {
  otherIncome: OthersIncome;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DetailsIncomeComponent>) { }

  ngOnInit() {
    this.otherIncome = this.data.otherIncome;
  }

}
