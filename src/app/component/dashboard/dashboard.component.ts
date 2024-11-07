import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Student } from '../../model/student';
import { DataService } from '../../service/data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getAllstudents();
  }

  isUpdate :boolean = false;

  data = inject(DataService);

  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    mobile: ''
  }

  id: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  mobile: string = '';


  auth = inject(AuthService)

  register() {
    this.auth.logout();
  }

  getAllstudents() {
    this.data.getAllstudents().then((res) => {
      this.studentsList = res;
    }, err => {
      alert('error while fetching data');
      alert(err.message);
    })
  }

  addStudent(){
    this.isUpdate=false;
    if(this.firstname == '' || this.lastname == '' || this.email == '' || this.mobile == ''){
      alert('Fill all input fields');
      return;
    }
    this.studentObj.id = '';
    this.studentObj.firstname = this.firstname;
    this.studentObj.lastname = this.lastname;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj);
    this.resetform();
    this.getAllstudents();
  }

  upadateStudent(student : Student){
    this.isUpdate = true;
    this.firstname = student.firstname;
    this.lastname = student.lastname;
    this.email = student.email;
    this.mobile = student.mobile;
    this.data.upadateStudent(student.id,student);
  }

  resetform(){
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.mobile = '';
  }

  deleteStudent(student : Student){
    if(window.confirm('Are you sure you want to delete' +student.firstname +' ' + student.lastname + '?'))
    this.data.deleteStudent(student.id);
    this.getAllstudents();
  }
}
