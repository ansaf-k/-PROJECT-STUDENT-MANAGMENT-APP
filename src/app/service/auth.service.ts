import { Injectable } from '@angular/core';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then(res => {
      localStorage.setItem('token', 'true');

      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
        console.warn('jkf')
      }else{
        this.router.navigate(['verify-email']); 
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then(res => {
      alert('Registration successfull')
      this.router.navigate(['login'])
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //signout
  logout() {
    signOut(auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }, err => {
      alert(err.message);
    })
  }

  //forgot password
  forgotPassword(email: string) {
    sendPasswordResetEmail(auth, email).then(() => {
      this.router.navigate(['verify-email'])
    }, err => {
      alert('something went wrong');
    })
  }

  sendEmailForVerification(user: any) {
    sendEmailVerification(user).then((res: any) => {
      this.router.navigate(['verify-email']);
    }, (err: any) => {
      alert('not able to send mail with registered email.');
    })
  }

  //sign in with google
  googlesignin(){
    return signInWithPopup(auth, new GoogleAuthProvider).then(res =>{
      this.router.navigate(['dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },err =>{
      alert(err.message);
    })
  }

}