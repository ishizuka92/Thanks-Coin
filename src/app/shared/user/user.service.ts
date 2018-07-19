import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

    private url = `${environment.apiUrl}/User`;
    private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    private httpOptions = { headers: this.headers };

    constructor(private httpclient: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.httpclient.get<User[]>(this.url);
    }

    changePassword(user: User, newPassword: any): Observable<User> {
        const body: User = user;
        body.password = newPassword;
        return this.httpclient.put<User>(`${this.url}/${user.id}`, body, this.httpOptions);

    }


}
