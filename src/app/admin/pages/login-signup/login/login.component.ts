import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: any = FormGroup;
  userName: any;
  password: any;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder


  ) { }

  ngOnInit(): void {
    this.createloginForm();
  }


  
  login() {
    this.userName = this.loginForm.value.userName;
    this.password = this.loginForm.value.password;


    this.router.navigateByUrl('/dashboard');

  }

  
  createloginForm() {
    this.loginForm = this.formBuilder.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required],
      

    });
  }
}
