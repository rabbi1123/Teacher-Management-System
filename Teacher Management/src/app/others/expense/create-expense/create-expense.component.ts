import { Component, OnInit, Inject } from '@angular/core';
import { OthersExpense } from "src/app/shared/othersExpense.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { OthersExpenseService } from "src/app/others/expense/others-expense.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  otherExpense: OthersExpense;
  isValid: boolean = true;
  constructor(private othersExpenseService: OthersExpenseService,@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CreateExpenseComponent>) { }

  ngOnInit() {
    if(this.data.otherExpense == null) {
      this.otherExpense = {
        id: null,
        description: '',
        amount: null,
        date: new Date().toLocaleDateString()
      };
    }
    else {
      this.otherExpense = Object.assign({},this.data.otherExpense);
    }
  }

  expenseCreate(form: NgForm) {
    if(this.validateForm(form.value)) {
      let data = Object.assign({}, form.value);
      delete data.id;
      if(form.value.id == null) {
        this.othersExpenseService.createOtherExpense(data).then(() => {
          this.dialogRef.close();
        }).catch(() => {
          alert('Something Error There');
        })
      }
      else {
        this.othersExpenseService.updateOtherExpense(data,form.value.id).then(() => {
          this.dialogRef.close();
        })
      }
    }
  }

  validateForm(expense: OthersExpense) {
    this.isValid = true;
    if(expense.description == '' || expense.description == null){
      this.isValid = false;
    }
    else if(expense.amount == null){
      this.isValid = false;
    }
    return this.isValid;
  }

}
