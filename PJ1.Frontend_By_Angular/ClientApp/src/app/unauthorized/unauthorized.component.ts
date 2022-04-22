import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Location} from '@angular/common';


@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

    constructor(private location: Location, private service: AuthService) {
    }

    ngOnInit(): void {
    }

    login() {
        this.service.startSigninMainWindow();
    }

    goback() {
        this.location.back();
    }

}
