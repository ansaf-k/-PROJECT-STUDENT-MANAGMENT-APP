import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  studentRef = collection(db, 'student');

  async getAllstudents(): Promise<Student[]> {
    const snapshot = await getDocs(this.studentRef);
    return snapshot.docs.map(doc => doc.data()as Student);
  }

  addStudent(student:Student){
    const setNewRef = doc(this.studentRef);
    student.id = setNewRef.id;
    return setDoc(setNewRef, student);
  }

  deleteStudent(id: string){
    const delRef = doc(this.studentRef,id);
    return deleteDoc(delRef);
  }

  upadateStudent(id: string ,student: Partial<Student>){
    const newRef = doc(this.studentRef,student.id);
    this.deleteStudent(id)
    return updateDoc(newRef,student)
  }
}
