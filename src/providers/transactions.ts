import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionsProvider {


  url = 'http://localhost:8080/transaction';
  // url = 'https://shelterhub-api.koyeb.app/transaction';

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
