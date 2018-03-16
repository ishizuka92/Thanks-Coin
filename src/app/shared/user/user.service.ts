import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {

    private apiUrlUser = 'http://10.133.210.147:3000/api/User';

    constructor(private httpclient: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.httpclient.get<User[]>(this.apiUrlUser);
    }

}