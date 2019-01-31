import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Wallet } from './wallet';
import { environment } from '../../../environments/environment';

@Injectable()
export class WalletService {

  private url = `${environment.apiUrl}/Wallet`;

  constructor(private httpclient: HttpClient) { }

  getAll(): Observable<Wallet[]> {
    return this.httpclient.get<Wallet[]>(this.url);
  }

  get(id: string): Observable<Wallet> {
    return this.httpclient.get<Wallet>(`${this.url}/${id}`);
  }

}
