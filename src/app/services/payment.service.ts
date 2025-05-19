import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../model/class/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getAllPayemnt(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllPayments');
  }

  addUpdatePayment(obj: Payment): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>('/api/api/ClientStrive/AddUpdatePayment', obj);
  }

  deletePayment(paymentId: number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>('/api/api/ClientStrive/DeletePaymentByPaymentId?paymentId='+paymentId)
  }

  getPaymentByPaymentId(paymentId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetPaymentByPaymentId?projectPaymentId='+paymentId)
  }

  getPaymentByProjectId(projectId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllPaymentsByProjectId?projectId='+projectId)
  }

   getPaymentByClientId(clientId: number): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>('/api/api/ClientStrive/GetAllPaymentsByClientId?clientId='+clientId)
  }
}
