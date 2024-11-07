import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email:string = '';
  password:string = '';

  auth = inject(AuthService);

  ngOnInit(): void {
      
  }

  login(){
    if(this.email == ''){
      alert('please enter email');
      return;
    }

    if(this.password == ''){
      alert('please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';


  }

  signinwithGoogle(){
    this.auth.googlesignin();
  }

  
}
