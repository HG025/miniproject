import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { ProjectChanges } from '../model/class/project';

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



// project changes

  getAllProjectChanges(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllProjectChange');
  }

  addUpdateProjectChanges(obj: ProjectChanges): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdateProjectChange', obj);
  }

  getProjectByProjChangeId(projectChangeId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetProjectChangeById?projectChangeId='+projectChangeId)
  }

  deleteProjectChange(projectChangeId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeleteChangeByChangeId?changeId='+ projectChangeId)
  }

  getProjectChangeByProjectId(projectId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllProjectChangeByProjectId?projectId='+ projectId)
  }




}