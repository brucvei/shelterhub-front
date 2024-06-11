import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Shelter} from "../models/Shelter";

@Injectable({
  providedIn: 'root'
})
export class ShelterProvider {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>('http://localhost:8080/shelter');
  }

  post(shelter: any) {
    return this.http.post<any>('http://localhost:8080/shelter', shelter);
  }
}
