import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
    providedIn: 'root'
})
export class UserData {
    HAS_LOGGED_IN = 'hasLoggedIn';

    constructor(
        public events: Events,
        public storage: Storage
    ) { }

    login(userName: string): Promise<any> {
        return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
            this.setUsername(userName);
            return this.events.publish('user:login');
        });
    }

    logout(): Promise<any> {
        return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
            return this.storage.remove('userName');
        }).then(() => {
            this.events.publish('user:logout');
        });
    }

    setUsername(username: string): Promise<any> {
        return this.storage.set('userName', username);
    }


    getUsername(): Promise<string> {
        return this.storage.get('userName').then((value) => {
            return value;
        });
    }

    isLoggedInAsAdmin(): Promise<boolean> {
        return this.storage.get('userName').then((value) => {
            return value === 'majda'; // TODO:
        });
    }

    isLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    }

}
