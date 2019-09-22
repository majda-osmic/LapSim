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
    USER = 'currentUser';

    constructor(
        private http: HttpClient,
        public events: Events,
        public storage: Storage
    ) { }

    login(userName: string, password: string): Observable<any> {

        const loginInfo = { userName, password };
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        // TODO: simply save the entire object to role
        return this.http.post<IUserOptions>('api/users/authenticate', loginInfo, options)
            .pipe(tap(user => {
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.storage.set(this.USER, JSON.stringify(user)).then(() => this.events.publish('user:login'));

                }
            }))
            .pipe(catchError(err => {
                return of(false);
            }));
    }




    logout() {
        this.storage.remove(this.USER)
            .then(() => {
                this.events.publish('user:logout');
            });
    }



    getUsername(): Promise<string> {
        return this.getUser().then((value) => {
            if (value) {
                return value.userName;
            }
        });
    }

    isLoggedInAsAdmin(): Promise<boolean> {
        return this.getUser().then((value) => {
            if (value) {
                return value.role.value === 'Admin';
            }
        });
    }

    isLoggedIn(): Promise<boolean> {
        return this.getUser().then((value) => {
            if (value) {
                return true;
            }
            return false;
        });
    }

    getToken(): Promise<string> {
        return this.getUser().then((value) => {
            if (value) {
                return value.token;
            }
        });
    }

    private getUser(): Promise<IUserOptions> {
        return this.storage.get(this.USER).then((value) => {
            if (value) {
                return JSON.parse(value);
            }
        });
    }
}
