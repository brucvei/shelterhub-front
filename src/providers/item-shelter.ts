import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemShelterProvider {

  url = 'http://localhost:8080/item-shelter';
  // url = 'https://shelterhub-api.koyeb.app/item-shelter';

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get<any>(this.url + '/shelter/' + id);
  }

  getById(id: string) {
    return this.http.get<any>(this.url + '/' + id);
  }

  post(obj: any) {
    return this.http.post<any>(this.url, obj);
  }

  put(obj: any) {
    return this.http.put<any>(this.url, obj);
  }

  delete(id: string) {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
