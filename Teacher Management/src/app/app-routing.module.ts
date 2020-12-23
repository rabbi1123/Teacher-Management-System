import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/home/home.component";
import { UserComponent } from "src/app/user/user.component";
import { CreateStudentComponent } from "src/app/student/create-student/create-student.component";
import { ListStudentComponent } from "src/app/student/list-student/list-student.component";
import { CreateGroupComponent } from "src/app/group/create-group/create-group.component";
import { ListGroupComponent } from "src/app/group/list-group/list-group.component";
import { MonthlyPaymentComponent } from "src/app/payment/monthly-payment/monthly-payment.component";
import { ListCoursePaymentComponent } from "src/app/payment/CoursePayment/list-course-payment/list-course-payment.component";
import { DetailsCoursePaymentComponent } from "src/app/payment/CoursePayment/details-course-payment/details-course-payment.component";
import { HomeStudentPaymentComponent } from "src/app/payment/home-student-payment/home-student-payment.component";
import { ListIncomeComponent } from "src/app/others/income/list-income/list-income.component";
import { ListExpenseComponent } from "src/app/others/expense/list-expense/list-expense.component";
import { MainComponent } from "src/app/main/main.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { ReportComponent } from "src/app/report/report/report.component";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { UserGuard } from "src/app/auth/user.guard";


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'Home', component: HomeComponent,
    children: [{path: '', component: MainComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'ListStudent', component: HomeComponent,
    children: [{path: '', component: ListStudentComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'ListGroup', component: HomeComponent,
    children: [{path: '', component: ListGroupComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'MonthlyPayment', component: HomeComponent,
    children: [{path: '', component: MonthlyPaymentComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'CoursePayment', component: HomeComponent,
    children: [{path: '', component: ListCoursePaymentComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'DetailsCoursePayment/:id', component: HomeComponent,
    children: [{path: '', component: DetailsCoursePaymentComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'HomeStudentPayment', component: HomeComponent,
    children: [{path: '', component: HomeStudentPaymentComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'ListOtherIncome', component: HomeComponent,
    children: [{path: '', component: ListIncomeComponent}],
    canActivate: [AuthGuard]
  },
  {
    path: 'ListOtherExpense', component: HomeComponent,
    children: [{path: '', component: ListExpenseComponent}],
    canActivate: [AuthGuard]
  },
  /* {
    path: 'Report', component: HomeComponent,
    children: [{path: '', component: ReportComponent}],
    canActivate: [AuthGuard]
  }, */
  
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: '**', component: HomeComponent,
    children: [{path: '', component: PageNotFoundComponent}],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
