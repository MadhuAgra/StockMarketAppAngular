import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { StocktradeService } from '../stocktrade.service';
import { Stock } from '../stock';
import { StockHolding } from '../stockholding';
import { FormControl, Validators, NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: User = new User();
  Stocks: Array<Stock> = [];
  quantity = 0;
  constructor(public dialog: MatDialog, private stockTradeService: StocktradeService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user.email = params['email'];
      this.user.password = params['password'];
    });
    this.stockTradeService.getUser(this.user.email, this.user.password).subscribe(user => {
      this.user = user;
      this.stockTradeService.user = this.user;
      this.initialiseDetails();
    });
    this.Stocks = [];
  }

  initialiseDetails() {
    this.stockTradeService.getUserStock(this.user.userId).subscribe(stocks => {
      this.stockTradeService.userStocks = JSON.parse(stocks.toString());
      this.getAllStockDetails();
    });
  }

  getAllStockDetails() {
    this.stockTradeService.getAllStockDetails().subscribe(stocks => {
      this.stockTradeService.allStockDetails = JSON.parse(stocks.toString());
      this.getUserStocks();
    });
  }

  getUserStocks() {
    if (this.Stocks.length == 0) {
      this.stockTradeService.userStocks.forEach(data => {
        this.Stocks.push(this.stockTradeService.allStockDetails.filter(item => item.stockId == data.stockId)[0]);
      });
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PortfolioDialog, {
      width: '500px',
      data: { name: this.user.userName, userCash: this.user.cashValue, userStock: this.user.stockValue }
    });
  }

  sellStocks(item: Stock): void {
    const dialogRef = this.dialog.open(SellDialog, {
      width: '500px',
      data: { stock: item }
    });
  }

  over(id: number) {
    this.quantity = (this.stockTradeService.userStocks.filter(data => data.stockId == id && data.userId == this.user.userId)[0]).quantity;
  }

  buyStocks() {
    this.router.navigate(['/buyStocks', this.user.email, this.user.password]);
  }
}

@Component({
  selector: 'portfolio-dialog',
  templateUrl: 'portfolio-dialog-popup.html',
})
export class PortfolioDialog {

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PortfolioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, userCash: string, userStock: string }
  ) { }

  onOkClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'sell-dialog',
  templateUrl: 'sell-dialog-popup.html',
})
export class SellDialog {

  item: StockHolding = new StockHolding();
  quantity = new FormControl('');
  constructor(private stockTradeService: StocktradeService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SellDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { stock: Stock }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onOkClick(): void {
    if (this.quantity.value > (this.stockTradeService.userStocks.filter(data => data.stockId == this.data.stock.stockId)[0]).quantity)
      this.snackBar.open('Not enough shares!!!', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    else {
      this.item.quantity = this.quantity.value;
      this.item.stockId = this.data.stock.stockId;
      this.item.userId = this.stockTradeService.user.userId;
      this.stockTradeService.decreaseQuantityTransaction(this.item).subscribe(data => {
        if (data) {
          this.snackBar.open('Transaction successful!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.stockTradeService.updateUserDetails(this.stockTradeService.user.userId,
            this.stockTradeService.user.cashValue + (this.quantity.value * this.data.stock.stockValue),
            this.stockTradeService.user.stockValue - (this.quantity.value * this.data.stock.stockValue)).subscribe(data => console.log(data));
        }
        else {
          this.snackBar.open('Transaction not successful!!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
        window.location.reload();
      });

    }
    this.dialogRef.close();
  }

}

