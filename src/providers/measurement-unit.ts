import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitProvider {

  url = 'https://delicate-cass-vitoriapizzutti-e8c0ca48.koyeb.app/measurement-unit';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>(this.url);
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
