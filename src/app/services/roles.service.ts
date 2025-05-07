import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllRoles');
  }

  getDashboardData(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetDasboardData')
  }


}
