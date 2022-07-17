import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    phone_number: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private User: UserService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createUser() {
    this.User.createUser(this.signupForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate([ '/login' ]);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Undo');
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }

}
