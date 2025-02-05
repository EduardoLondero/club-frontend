import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient) {}


  getAllPayments():Observable<any>{
    return this.http.get(`${this.apiUrl}/payment`);
  }

  getPaymentsByMembershipID(membershipId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payment/membership/${membershipId}`);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment`, paymentData);
  }
}
