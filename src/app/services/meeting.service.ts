import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { Meeting } from '../model/class/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  getAllMeetings() : Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllMeetings');
  }

  addUpdateMeeting(obj: Meeting): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdateProjectMeeting', obj);
  }

  deleteMeeting(id: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeleteMeetingByMeetingId?meetingId='+id)
  }

  getMeetingById(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`/api//api/ClientStrive/GetMeetingByMeetingId?meetingid=`+id);
  }

  getMeetingByProjectId(id: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllMeetingsByProjectId?projectId='+id);
  }
}
