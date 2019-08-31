import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IUserOptions } from '../data-interfaces';




@Injectable({
    providedIn: 'root'
})
export class AuthService {
    HAS_LOGGED_IN = 'hasLoggedIn';

    constructor(
        private http: HttpClient,
        public events: Events,
        public storage: Storage
    ) { }

    login(userName: string, password: string): Observable<any> {

        const loginInfo = { username: userName, password };
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


        // TODO: simply save the entire object to role
        return this.http.post<IUserOptions>('api/users/authenticate', loginInfo, options)
            .pipe(tap(data => {
                this.setUsername(data.userName);
                this.setToken(data.token);
                this.setRole(data.role.value);
                this.events.publish('user:login');
                return of(true);
            }))
            .pipe(catchError(err => {
                console.error(err);
                return of(false);
            }));
    }



    logout() {
        this.storage.remove(this.HAS_LOGGED_IN).then(() => {
            return this.storage.remove('userName');
        }).then(() => {
            this.events.publish('user:logout');
        });
    }

    private setUsername(username: string): Promise<any> {
        return this.storage.set('userName', username);
    }

    
    private setToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    private setRole(role: string): Promise<any> {
        return this.storage.set('role', role);
    }



    getUsername(): Promise<string> {
        return this.storage.get('userName').then((value) => {
            return value;
        });
    }

    isLoggedInAsAdmin(): Promise<boolean> {
        return this.storage.get('role').then((value) => {
            return value === 'admin'; // TODO: server
        });
    }

    isLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    }

    getToken(): Promise<string> {
        return this.storage.get('token');
    }
}
