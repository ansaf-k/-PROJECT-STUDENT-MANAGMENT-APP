import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  email:string = '';
  password:string = '';

  auth = inject(AuthService)

  ngOnInit(): void {
      
  }

  register(){
    if(this.email == ''){
      alert('please enter email');
      return;
    }

    if(this.password == ''){
      alert('please enter password');
      return;
    }

    this.auth.register(this.email,this.password);

    this.email = '';
    this.password = '';

  }
}
