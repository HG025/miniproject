import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllEmployee');
  }
}
