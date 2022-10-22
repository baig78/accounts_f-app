import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriMapComponent } from './admin/pages/agri-map/agri-map.component';

import { AskComponent } from './admin/pages/ask/ask.component';
import { StaffComponent } from './admin/pages/staff/staff.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
// import { ExpensesComponent } from './admin/pages/expenses/diseases-list.component';
import { AdminLoginComponent } from './admin/pages/login/login.component';
import { NotificationsComponent } from './admin/pages/notifications/notifications.component';
import { ProoductListComponent } from './admin/pages/product-list/product-list.component';
import { PurchasesComponent } from './admin/pages/purchases/purchases.component';
import {  SupplierComponent } from './admin/pages/supplier/supplier.component';
import { YourCropComponent } from './mobile/pages/your-crop/your-crop.component';
import { UserManagementComponent } from './admin/pages/user-management/user-management.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';
import { ExpensesComponent } from './admin/pages/expenses/expenses.component';
import { PurchaseReturnComponent } from './admin/pages/purchases-return/purchase-return.component';

const routes: Routes = [
  { path: 'staff', component: StaffComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'user-management', component: UserManagementComponent },

  { path: 'your-crop', component: YourCropComponent },
  { path: 'user-questions', component: AskComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'purchase-return', component: PurchaseReturnComponent },
  // { path: 'diseasess', component: ExpensesComponent },
  { path: 'agri-map', component: AgriMapComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'products-list', component: ProoductListComponent },
  { path: 'categories', component: CategoriesComponent },
  // { path: 'leaves', loadChildren: () => import(`./leaves/leaves.module`).then(m => m.LeavesModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
