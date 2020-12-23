import { Component, OnInit, Inject } from '@angular/core';
import { OthersIncome } from "src/app/shared/othersIncome.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { OthersIncomeService } from "src/app/others/income/othersIncome.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.css']
})
export class CreateIncomeComponent implements OnInit {
  othersIncome: OthersIncome;
  isValid: boolean = true;
  constructor(private othersIncomeService: OthersIncomeService ,@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CreateIncomeComponent>) { }

  ngOnInit() {
    if(this.data.otherIncome == null) {
      this.othersIncome = {
        id: null,
        description: '',
        amount: null,
        date: new Date().toLocaleDateString()
      };
    }
    else {
      this.othersIncome = Object.assign({},this.data.otherIncome);
    }
  }

  incomeCreate(form: NgForm) {
    if(this.validateForm(form.value)) {
      let data = Object.assign({}, form.value);
      delete data.id;
      if(form.value.id == null) {
        this.othersIncomeService.createOtherIncome(data).then(() => {
          this.dialogRef.close();
        }).catch(() => {
          alert('Something Error There');
        })
      }
      else {
        this.othersIncomeService.updateOtherIncome(data,form.value.id).then(() => {
          this.dialogRef.close();
        })
      }
    }
  }

  validateForm(income: OthersIncome) {
    this.isValid = true;
    if(income.description == '' || income.description == null){
      this.isValid = false;
    }
    else if(income.amount == null){
      this.isValid = false;
    }
    return this.isValid;
  }

}
