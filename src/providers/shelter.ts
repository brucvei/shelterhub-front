import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Shelter} from "../models/Shelter";

@Injectable({
  providedIn: 'root'
})
export class ShelterProvider {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>('http://localhost:8080/shelter').subscribe(resp => {
      console.log(resp)
      let shelter;
      if (resp) {
        shelter = new Shelter(resp.id, resp.name, resp.address, resp.items);
      }
      return shelter;
    });
  }

  post(shelter: Shelter) {
    return this.http.post<Shelter>('http://localhost:8080/shelter', shelter).subscribe(resp => {
      return new Shelter(resp.id, resp.name, resp.address, resp.items);
    });
  }
}
