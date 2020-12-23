import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from "src/app/shared/home.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.css']
})
export class MonthlyPaymentComponent implements OnDestroy, OnInit {
  paymentList: any;
  month: any;
  monthList: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.dtOptions = {
      "scrollY": "300px",
      "scrollCollapse": true,
      "retrieve": true,
      "paging": false
    };

    var mon = new Date().toLocaleString('default', { month: 'long' });
    this.month = mon;
    this.listByMonth(mon);
    
    this.homeService.getMonthList().subscribe(list => {
      list.forEach(el => {
        this.monthList.push(el.data().name);
      })
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listByMonth(mo) {
    this.homeService.getMonthlyPayment(mo).subscribe(pay => {
      this.homeService.getStudentList(pay.docs[0].id).subscribe(list => {
        this.paymentList = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        })
        this.dtTrigger.next();
      })
    })
  }

  getMonth(type) {
    this.listByMonth(type);
  }

  changePayment(student){
    var data;
    if(student.Condition == 'unpaid'){
      data = {
        studentID: student.studentID,
        Name: student.Name,
        Condition: 'paid',
        Date: new Date().toLocaleDateString()
      }
    } else {
      data = {
        studentID: student.studentID,
        Name: student.Name,
        Condition: 'unpaid',
      }
    }
    
    this.homeService.getMonthlyPayment(this.month).subscribe(pay => {
      this.homeService.updatePayment(data,pay.docs[0].id,student.id);
    })
  }



}
