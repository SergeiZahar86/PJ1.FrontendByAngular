import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserManager, WebStorageStateStore} from "oidc-client";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {from} from 'rxjs';
import {map} from "rxjs/operators";
//import {Headers, RequestOptions, Response} from '@angular/http';


/**
 * Настройки клиента аутентификации.
 * Полный список параметров конфигурации см. в официальной документации oidc-client-js
 * https://github.com/IdentityModel/oidc-client-js/wiki#configuration
 *  * @type {{loadUserInfo: boolean, automaticSilentRenew: boolean, userStore:
 * WebStorageStateStore, response_type: string, checkSessionInterval: number,
 * post_logout_redirect_uri: string, popupWindowTarget: string, staleStateAge: number, client_id:
 * string, silentRequestTimeout: number, stateStore: WebStorageStateStore, authority: string,
 * scope: string, includeIdTokenInSilentRenew: boolean, mergeClaims: boolean, redirect_uri: string,
 * clockSkew: number, silent_redirect_uri: string, accessTokenExpiringNotificationTime: number,
 * revokeAccessTokenOnSignout: boolean, filterProtocolClaims: boolean, monitorSession: boolean}}
 */
const settings: any = {

    /** URL провайдера OIDC / OAUTH2 */
    authority: 'https://localhost:10001',

    /** Идентификатор вашего клиента, зарегистрированный в OIDC/OAuth2 */
    client_id: 'client_js',

    /** Redirect URI вашего клиента приложения при получения ответа
     *  от провайдера OIDC / OAUTH2 */
    redirect_uri: 'http://localhost:10003/auth.html',

    /** The OIDC/OAuth2 post-logout перенаправление после разлагина URI */
    post_logout_redirect_uri: 'http://localhost:10003/',

    /** URL -адрес страницы, содержащей код, обрабатывает тихое возобновление */
    silent_redirect_uri: 'http://localhost:10003/silent-renew.html',

    /** Тип ответа требуемый из поставщика OIDC / OAUTH2 (default: 'id_token') */
    response_type: 'code',

    /** The scope Запрашивается от провайдера OIDC / OAUTH2 (default: 'openid') */
    scope: 'openid profile SwaggerAPI',

    /** Объект хранения, используемый для сохранения пользователя для пользователя
     *  в данный момент аутентифицированного пользователя (default: session storage) */
    userStore: new WebStorageStateStore({store: window.localStorage}),

    /** Флаг, чтобы указать, должна ли быть автоматическая попытка возобновить токен
     *  доступа до его истечения (по умолчанию: false) */
    automaticSilentRenew: true,

    /**Количество секунд до того, как токен доступа истекает, чтобы поднять
     * событие accessTokenExpiring (по умолчанию: 60) */
    accessTokenExpiringNotificationTime: 30,

    /** Количество миллисекунд, чтобы ждать молчаливого обновления, чтобы вернуться
     *  до того, как предположить, что он не удался или истечет (по умолчанию: 10000) */
    silentRequestTimeout: 10000,

    /** следует ли удалять утверждения протокола OIDC из файлов profile. (по умолчанию: true) */
    filterProtocolClaims: true,

    /** флаг для управления загрузкой дополнительных идентификационных данных
     *  из конечной точки сведений о пользователе для заполнения файла profile.
     *  (по умолчанию: true) */
    loadUserInfo: false,


    // --- Дополнительные настройки не входившие в шаблон ---------------------------------------
    // ------------------------------------------------------------------------------------------

    /** URL для страницы, содержащей вызов для SigninPopupCallback для обработки
     *  обратного вызова от OIDC / OAUTH2 */
    //popup_redirect_uri: "",

    /** Параметр функций в Window.Open для окна всплывающего окна.
     *  default: 'location=no,toolbar=no,width=500,height=500,left=100,top=100' */
    //popupWindowFeatures: "",

    /** target параметр window.open для всплывающего окна входа. (default: '_blank') */
    //popupWindowTarget: "_blank",

    /** флаг для управления id_token включением, как id_token_hint в автоматических вызовах
     *  обновления. (default: true) */
    //includeIdTokenInSilentRenew: true,

    /** вызовет события, когда пользователь выполнил выход из OP. (default: true) */
    //monitorSession: true,

    /** интервал в миллисекундах для проверки сеанса пользователя (2 секунды) (default: 2000) */
    //checkSessionInterval: 2000,

    /** вызовет конечную точку отзыва при выходе из системы, если для
     *  пользователя имеется токен доступа. (default: false) */
    //revokeAccessTokenOnSignout: false,

    /** The OIDC/OAuth2 post-logout  URI перенаправления когда используешь popup */
    //popup_post_logout_redirect_uri: "",

    /** число (в секундах), указывающее возраст записей состояния в хранилище
     * для запросов на авторизацию, которые считаются брошенными и, следовательно,
     * могут быть очищены. (default: 300) */
    //staleStateAge: 300,

    /** Окно времени (в секундах), позволяющее текущему времени отклоняться
     *  при проверке значений id_token iat, nbf, и exp. (default: 300) */
    //clockSkew: 300,

    /**  (default: local storage) Объект хранилища, используемый для сохранения состояния
     *  взаимодействия. Например userStore: new WebStorageStateStore({ store:
     *  window.localStorage })*/
    //stateStore: new WebStorageStateStore({store: window.localStorage}),

    /** (по умолчанию: false) указывает, объединяются ли объекты, возвращенные
     *  из конечной точки информации о пользователе в качестве утверждений
     *  (например address, ), с утверждениями из токена id как единый объект.
     *  В противном случае они добавляются в массив как отдельные
     *  объекты для типа утверждения.*/
    mergeClaims: false

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
    async getUser() {
        await this.userManager.getUser().then((user) => {
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
     * Сделать вход Sign In
     */
    startSigninMainWindow() {
        this.userManager.signinRedirect({data: 'some data'})
            .then(function () {
                console.log('signinRedirect done');
                window.alert('signinRedirect done');
            }).catch(function (err) {
            console.log(err);
            window.alert(err.toString());
        });
    }

    /**
     * Ответ процесса от конечной точки авторизации.
     */
    endSigninMainWindow() {
        this.userManager.signinRedirectCallback().then(user => {
            window.alert(`signed in ${user}`);
            console.log('signed in', user);
        }).catch(function (err) {
            window.alert(err.toString());
            console.log(err);
        });
    }

    /** Разлогиниться  Sign Out */
    startSignoutMainWindow() {
        this.userManager.getUser().then(user => {
            return this.userManager
                .signoutRedirect({id_token_hint: user?.id_token})
                .then(resp => {
                    window.alert(`signed in ${resp}`);
                    console.log('signed out', resp);
                    setTimeout(() => {
                        window.alert('testing to see if fired...');
                        console.log('testing to see if fired...');
                    }, 5000);
                }).catch(function (err) {
                    window.alert(err.toString());
                    console.log(err);
                });
        });
    };

    endSignoutMainWindow() {
        this.userManager.signoutRedirectCallback().then(resp => {
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
