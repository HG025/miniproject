import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { Designation, Employee, Roles } from '../model/interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllEmployee');
  }

  addNewEmployee(obj: Employee): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/CreateNewEmployee', obj);
  }

  updateEmployee(obj: Employee): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/UpdateEmployee', obj);
  }

  getEmployeeByEmpId(empId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetEmployeeByEmployeeId?id='+ empId)
  }

  deleteEmployee(empId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeleteEmployeeByEmpId?empId='+ empId)
  }



  // Designations

  getAllDesignation(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllDesignation');
  }

  addUpdateDesignation(obj: Designation[]): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdateBulkDesignation', obj)
  }

  deleteDesignation(designationId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeleteDesignationById?designationId='+designationId)
  }


  // roles

  getAllRole(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllRoles');
  }

  addUpdateRoles(obj: Roles[]): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdateBulkRoles', obj);
  }

  deleteRole(roleId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeleteRoleById?roleid='+ roleId)
  }





}
