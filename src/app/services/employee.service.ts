import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { employee } from '../model/interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllEmployee');
  }

  addNewEmployee(obj: employee): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/CreateNewEmployee', obj);
  }
}
