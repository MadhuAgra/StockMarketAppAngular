import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { StocktradeService } from '../stocktrade.service';
import { FormControl, Validators, NgControlStatus } from '@angular/forms';
import { MatSnackBar, MatIconModule } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private stockTradeService: StocktradeService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  
  about(){
    this.snackBar.open('This is a stock market application,where you can buy and sell stocks..', 'Close', {
      duration: 2000,
      verticalPosition : 'top',
    });
  }

  contact()
  {
    this.snackBar.open('Madhu Agrawal and Anwesha Pal', 'Close', {
      duration: 2000,
      verticalPosition : 'top',
    });
  }
  login() {
    this.stockTradeService.getUser(this.email.value, this.password.value).subscribe(user => {
      if (user) {
        this.router.navigate(['/userDashboard', this.email.value, this.password.value]);
      }
      else {
          this.snackBar.open('Email or password is incorrect', 'Close', {
            duration: 2000,
            verticalPosition : 'top',
          });
        }
  });
}

}

