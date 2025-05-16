import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllClientProjects')
  }

  getProjectLeadByEmpId(employeeId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetProjectsLeadByEmployeeId?empId='+employeeId)
  }

  getProjectByClientId(clientId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetProjectsByClientId?clientId='+clientId)
  }

  getProjectByProjId(projectId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetProjectByProjectId?clientProjectId='+projectId)
  }



  addupdateProject(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/AddUpdateClientProject');
  }

}