import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BuyStocksComponent } from './buy-stocks/buy-stocks.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full'},
{path : 'register', component : RegisterComponent},
{path : 'userDashboard/:email/:password', component : UserDashboardComponent},
{path : 'buyStocks/:email/:password', component : BuyStocksComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
