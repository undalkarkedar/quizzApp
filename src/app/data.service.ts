import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
readonly data = '../assets/QnA.json'
  constructor(private http:HttpClient) { }
  QnAData(){
  return this.http.get(this.data)
  }
}
