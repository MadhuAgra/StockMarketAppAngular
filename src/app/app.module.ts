import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCheckboxModule,  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatGridListModule,MatSnackBarModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent, PortfolioDialog,SellDialog } from './user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BuyStocksComponent,BuyStockDialog } from './buy-stocks/buy-stocks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    PortfolioDialog,
    BuyStockDialog,
    SellDialog,
    BuyStocksComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    HttpClientModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PortfolioDialog,BuyStockDialog,SellDialog]
})
export class AppModule { }
