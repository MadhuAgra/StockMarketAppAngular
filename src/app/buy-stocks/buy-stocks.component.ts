import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { StocktradeService } from '../stocktrade.service';
import { Stock } from '../stock';
import { StockHolding } from '../stockholding';
import { FormControl, Validators, NgControlStatus } from '@angular/forms';


@Component({
  selector: 'app-buy-stocks',
  templateUrl: './buy-stocks.component.html',
  styleUrls: ['./buy-stocks.component.css']
})
export class BuyStocksComponent implements OnInit {

  user: User = new User();
  constructor(public dialog: MatDialog, private stockTradeService: StocktradeService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user.email = params['email'];
      this.user.password = params['password'];
    });
    this.stockTradeService.getUser(this.user.email, this.user.password).subscribe(user => {
      this.user = user;
      this.stockTradeService.user = this.user;
    });
    this.getAllStockDetails();
  }

  getAllStockDetails() {
    this.stockTradeService.getAllStockDetails().subscribe(stocks => {
      this.stockTradeService.allStockDetails = JSON.parse(stocks.toString());
    });
  }


  openDialog(item: Stock): void {
    const dialogRef = this.dialog.open(BuyStockDialog, {
      width: '500px',
      data: { name: item.stockName, price: item.stockValue, id: item.stockId }
    });
  }

  back() {
    this.router.navigate(['/userDashboard', this.user.email, this.user.password]);
  }
}

@Component({
  selector: 'buy-stock-dialog',
  templateUrl: 'buy-stock-dialog-popup.html',
})
export class BuyStockDialog {
  quantity = new FormControl('');
  item: StockHolding = new StockHolding();
  constructor(private stockTradeService: StocktradeService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BuyStockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, price: number, id: number }
  ) { }

  onOkClick(): void {
    if (this.quantity.value * this.data.price > this.stockTradeService.user.cashValue)
      this.snackBar.open('Not enough cash!!', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    else {
      this.item.quantity = this.quantity.value;
      this.item.stockId = this.data.id;
      this.item.userId = this.stockTradeService.user.userId;
      this.stockTradeService.insertOrUpdateTransaction(this.item).subscribe(data => {
        if (data) {
          this.snackBar.open('Transaction successful!!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
        else {
          this.snackBar.open('Transaction not successful!!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
      });
      this.stockTradeService.updateUserDetails(this.stockTradeService.user.userId,
        this.stockTradeService.user.cashValue - (this.quantity.value * this.data.price),
        this.stockTradeService.user.stockValue + (this.quantity.value * this.data.price)).subscribe();
    }
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
