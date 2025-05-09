import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { meeting } from '../model/interface/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  getAllMeetings() : Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllMeetings');
  }

  addMeeting(obj: meeting): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdateProjectMeeting', obj);
  }
}
