import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AskComponent } from './admin/pages/ask/ask.component';
import { StaffComponent } from './admin/pages/staff/staff.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
// import { ExpensesComponent } from './admin/pages/expenses/diseases-list.component';
import { AdminLoginComponent } from './admin/pages/login-signup/login/login.component';
import { NotificationsComponent } from './admin/pages/notifications/notifications.component';
import { ProoductListComponent } from './admin/pages/product-list/product-list.component';
import { PurchasesComponent } from './admin/pages/purchases/purchases.component';
import {  SupplierComponent } from './admin/pages/supplier/supplier.component';
import { UserManagementComponent } from './admin/pages/user-management/user-management.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';
import { ExpensesComponent } from './admin/pages/expenses/expenses.component';
import { PurchaseReturnComponent } from './admin/pages/purchases-return/purchase-return.component';
import { DamagePurchasesComponent } from './admin/pages/damage-purchases/damage-purchases.component';
// import { SalesComponent } from './admin/pages/sales/newInvoice/sales.component';
// import { SalesReturnComponent } from './admin/pages/sales/new-credit-notes/new-credit-notes.component';
import { RetailersComponent } from './admin/pages/sales/retailers/retailers.component';
import { NewInvoiceComponent } from './admin/pages/sales/new-invoice/new-invoice.component';
import { NewCreditNotesComponent } from './admin/pages/sales/new-credit-notes/new-credit-notes.component';
import { ProductBatchComponent } from './admin/pages/product-batch/product-batch.component';
import { ProductModelComponent } from './admin/pages/product-model/product-model.component';
import { PaymentsComponent } from './admin/pages/payments/payments.component';
import { NewSalesComponent } from './admin/pages/sales/new-sales/new-sales.component';
import { NewCustomerComponent } from './admin/pages/customer/new-customer/new-customer.component';
import { CustomerListComponent } from './admin/pages/customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: 'staff', component: StaffComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'user-management', component: UserManagementComponent },

  { path: 'user-questions', component: AskComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'damage-purchases', component: DamagePurchasesComponent },
  { path: 'purchase-return', component: PurchaseReturnComponent },
  // { path: 'sales', component: NewInvoiceComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'new-credit-note', component: NewCreditNotesComponent },
  { path: 'retailers', component: RetailersComponent },
  // { path: 'diseasess', component: ExpensesComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'products-list', component: ProoductListComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'product-batch', component: ProductBatchComponent },
  { path: 'product-model', component: ProductModelComponent },
  { path: 'payment', component: PaymentsComponent },

  // --------new--------
  { path: 'new-sales', component: NewSalesComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: 'customer-list', component: CustomerListComponent },



  // { path: 'leaves', loadChildren: () => import(`./leaves/leaves.module`).then(m => m.LeavesModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
