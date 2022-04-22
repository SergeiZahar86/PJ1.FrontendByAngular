import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserManager, WebStorageStateStore} from "oidc-client";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {from} from 'rxjs';
//import {Headers, RequestOptions, Response} from '@angular/http';


const settings: any = {
    // TODO Добавить все комментарии для свойств, и добавить все возможные 
    //  свойства для наглядности
    
    authority: 'https://localhost:10001',
    client_id: 'client_js',
    redirect_uri: 'http://localhost:10003/auth.html',
    post_logout_redirect_uri: 'http://localhost:10003/',
    response_type: 'code',
    scope: 'openid profile SwaggerAPI',
    userStore: new WebStorageStateStore(
        {store: window.localStorage}),
    silent_redirect_uri: 'http://localhost:10003/silent-renew.html',
    
    /**
     *  Флаг, чтобы указать, должна ли быть автоматическая попытка возобновить токен
     *  доступа до его истечения (по умолчанию: false)
     */
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,

    filterProtocolClaims: true,
    loadUserInfo: true
    
};



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /**
     * Менеджер пользователя
     */
    userManager: UserManager = new UserManager(settings);
    /**
     * Событие загрузки пользователя
     */
    userLoadedEvent: EventEmitter<User | null> = new EventEmitter<User | null>();
    /**
     * Текущий пользователь
     */
    currentUser: User | null | undefined;
    /**
     * Флаг входа в систему
     */
    loggedIn = false;

    /**
     * Интерфейс для работы с заголовками Http ответа
     */
    authHeaders: any;

    constructor(private http: HttpClient) {
        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    this.loggedIn = true;
                    this.currentUser = user;
                    this.userLoadedEvent.emit(user);
                } else {
                    this.loggedIn = false;
                }
            })
            .catch((err) => {
                this.loggedIn = false;
            });

        this.userManager.events.addUserLoaded((user) => {
            this.currentUser = user;
            this.loggedIn = !(user === undefined);
            if (!environment.production) {
                console.log('authService addUserLoaded', user);
            }

        });

        this.userManager.events.addUserUnloaded(() => {
            if (!environment.production) {
                console.log('user unloaded');
            }
            this.loggedIn = false;
        });

    }

    /**
     * Событие сигнализирующее загрузку пользователя
     */
    isLoggedInObs(): Observable<boolean> {
        return from(this.userManager.getUser()).pipe(map<User | null, boolean>((user: any) => {
            if (user) {
                return true;
            } else {
                return false;
            }
        }));
    }

    /**
     * Очистить состояние
     */
    clearState() {
        this.userManager.clearStaleState().then(function () {
            console.log('clearStateState success');
        }).catch(function (e) {
            console.log('clearStateState error', e.message);
        });
    }

    /**
     * Получение пользователя
     */
    getUser() {
        this.userManager.getUser().then((user) => {
            this.currentUser = user;
            console.log('got user', user);
            this.userLoadedEvent.emit(user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    /**
     * Удаление пользователя
     */
    removeUser() {
        this.userManager.removeUser().then(() => {
            this.userLoadedEvent.emit(null);
            console.log('user removed');
        }).catch(function (err) {
            console.log(err);
        });
    }

    /**
     * Сделать вход с главного окна
     */
    startSigninMainWindow() {
        this.userManager.signinRedirect({data: 'some data'}).then(function () {
            console.log('signinRedirect done');
        }).catch(function (err) {
            console.log(err);
        });
    }

    /**
     * Сделать выход с главного окна
     */
    endSigninMainWindow() {
        this.userManager.signinRedirectCallback().then(function (user) {
            console.log('signed in', user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    startSignoutMainWindow() {
        this.userManager.getUser().then(user => {
            return this.userManager.signoutRedirect({id_token_hint: user?.id_token})
                .then(resp => {
                    console.log('signed out', resp);
                    setTimeout(() => {
                        console.log('testing to see if fired...');
                    }, 5000);
                }).catch(function (err) {
                    console.log(err);
                });
        });
    };

    endSignoutMainWindow() {
        this.userManager.signoutRedirectCallback().then(function (resp) {
            console.log('signed out', resp);
        }).catch(function (err) {
            console.log(err);
        });
    };

    /**
     * Пример того, как вы можете сделать запрос авторизации с использованием angular методов HTTP.
     * @param options if options are not supplied the default content type is application/json
     */
    AuthGet(url: string, options?: any): Observable<any> {

        // if (options) {
        //     options = this._setRequestOptions(options);
        // } else {
        //     options = this._setRequestOptions();
        // }
        return this.http.get(url, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPut(url: string, data: any, options?: any): Observable<any> {

        let body = JSON.stringify(data);

        // if (options) {
        //     options = this._setRequestOptions(options);
        // } else {
        //     options = this._setRequestOptions();
        // }
        return this.http.put(url, body, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthDelete(url: string, options?: any): Observable<any> {

        // if (options) {
        //     options = this._setRequestOptions(options);
        // } else {
        //     options = this._setRequestOptions();
        // }
        return this.http.delete(url, options);
    }

    /**
     * @param options if options are not supplied the default content type is application/json
     */
    AuthPost(url: string, data: any, options?: any): Observable<any> {

        let body = JSON.stringify(data);

        // if (options) {
        //     options = this._setRequestOptions(options);
        // } else {
        //     options = this._setRequestOptions();
        // }
        return this.http.post(url, body, options);
    }


/*
    private _setAuthHeaders(user: any): void {
        this.authHeaders = new Headers();
        this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
        if (this.authHeaders.get('Content-Type')) {

        } else {
            this.authHeaders.append('Content-Type', 'application/json');
        }
    }
*/

/*
    private _setRequestOptions(options?: any) {
        if (this.loggedIn) {
            this._setAuthHeaders(this.currentUser);
        }
        if (options) {
            options?.headers?.append(this.authHeaders?.keys[0], this.authHeaders?.values[0]);
        } else {
            options = {headers: this.authHeaders};
        }

        return options;
    }
*/

}
