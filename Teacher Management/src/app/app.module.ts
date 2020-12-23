import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from "src/environments/environment";
import { HomeComponent } from "src/app/home/home.component";
import { batchService } from "src/app/shared/batch.service";
import { UserComponent } from "src/app/user/user.component";
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { DetailsStudentComponent } from './student/details-student/details-student.component';
import { StudentService } from "src/app/student/student.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { DetailsGroupComponent } from './group/details-group/details-group.component';
import { MonthlyPaymentComponent } from './payment/monthly-payment/monthly-payment.component';
import { ListCoursePaymentComponent } from './payment/CoursePayment/list-course-payment/list-course-payment.component';
import { DetailsCoursePaymentComponent } from './payment/CoursePayment/details-course-payment/details-course-payment.component';
import { UpdateCoursePaymentComponent } from './payment/CoursePayment/update-course-payment/update-course-payment.component';
import { HomeStudentPaymentComponent } from './payment/home-student-payment/home-student-payment.component';
import { ListIncomeComponent } from './others/income/list-income/list-income.component';
import { CreateIncomeComponent } from './others/income/create-income/create-income.component';
import { DetailsIncomeComponent } from './others/income/details-income/details-income.component';
import { CreateExpenseComponent } from './others/expense/create-expense/create-expense.component';
import { ListExpenseComponent } from './others/expense/list-expense/list-expense.component';
import { DetailsExpenseComponent } from './others/expense/details-expense/details-expense.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from "src/app/auth/auth.guard";
import { ReportComponent } from './report/report/report.component';
import { DataTablesModule } from 'angular-datatables';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    CreateStudentComponent,
    ListStudentComponent,
    DetailsStudentComponent,
    CreateGroupComponent,
    ListGroupComponent,
    DetailsGroupComponent,
    MonthlyPaymentComponent,
    ListCoursePaymentComponent,
    DetailsCoursePaymentComponent,
    UpdateCoursePaymentComponent,
    HomeStudentPaymentComponent,
    ListIncomeComponent,
    CreateIncomeComponent,
    DetailsIncomeComponent,
    CreateExpenseComponent,
    ListExpenseComponent,
    DetailsExpenseComponent,
    MainComponent,
    ReportComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [CreateStudentComponent,DetailsStudentComponent, CreateGroupComponent, DetailsGroupComponent, UpdateCoursePaymentComponent, CreateIncomeComponent, DetailsIncomeComponent, CreateExpenseComponent, DetailsExpenseComponent],
  providers: [batchService,StudentService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
