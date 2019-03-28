import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { StocktradeService } from '../stocktrade.service';
import { FormControl, Validators, NgControlStatus } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('');
  email = new FormControl('');
  confirmedEmail = new FormControl('');
  password = new FormControl('');
  confirmedPassword = new FormControl('');
  user: User = new User();

  constructor(private stockTradeService: StocktradeService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register() {
    this.stockTradeService.checkExistingUser(this.email.value).subscribe(user => {
      if (user) {
        this.snackBar.open('Email already exists. Use a different mail id.', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
      else {
        if (this.email.value != this.confirmedEmail.value)
          this.snackBar.open('Email does not match!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        else if (this.password.value != this.confirmedPassword.value)
          this.snackBar.open('Password does not match!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        else {
          this.user.userName = this.name.value;
          this.user.email = this.email.value;
          this.user.password = this.password.value;
          this.stockTradeService.registerUser(this.user).subscribe(data => {
            if (data) {
              this.stockTradeService.user = this.user;
              this.router.navigate(['/userDashboard', this.user.email, this.user.password])
            }
            else {
              this.snackBar.open('Registration not successful!!!', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
              });
            }
          });
        }
      }
    });
  }
}
