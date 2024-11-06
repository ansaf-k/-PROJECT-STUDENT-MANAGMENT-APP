import { Injectable } from '@angular/core';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email:string, password:string){
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      localStorage.setItem('token','true');  
      this.router.navigate(['/dashboard']);
    },err => {
      console.warn(err)
      this.router.navigate(['/login']);
    })
  }

  register(email:string, password:string){
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      alert('Registration successfull')
      this.router.navigate(['login'])
    },err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //signout
  logout(){
    signOut(auth).then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    },err => {
      alert(err.message);
    })
  }

}
