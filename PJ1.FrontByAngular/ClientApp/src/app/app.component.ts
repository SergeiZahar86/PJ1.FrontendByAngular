import {AfterContentInit, Component, NgIterable, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {User} from "oidc-client";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
    title = 'app';

    curentUserString: User | null | undefined;
    constructor(private authService: AuthService) {

    }

    ngOnInit(): void {
    }

    async ngAfterContentInit(): Promise<void> {
        await this.authService.getUser();
        this.curentUserString = this.authService.currentUser;
        console.log("currentUser ", this.curentUserString);
    }


}
