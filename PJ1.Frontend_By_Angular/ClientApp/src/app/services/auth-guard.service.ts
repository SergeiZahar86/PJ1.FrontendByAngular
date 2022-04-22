import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate():
        Observable<boolean | UrlTree> | 
        Promise<boolean | UrlTree> | 
        boolean | UrlTree 
    {
        let isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
            if (!loggedin) {
                this.router.navigate(['unauthorized']);
            }
        });
        return isLoggedIn;
    }
}
