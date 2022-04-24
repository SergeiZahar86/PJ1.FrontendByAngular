import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {ProtectedComponent} from "./protected/protected.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";

//// определение дочерних маршрутов
//const itemRoutes: Routes = [
//    { path: 'login', component: LoginComponent},
//    { path: 'protected', component: ProtectedComponent},
//];

const routes: Routes = [
//  {
//    path: '',
//    redirectTo: '/dashboard',
//    pathMatch: 'full'
//  },
    {
        path: '',
        component: DashboardComponent
    },
//    { path: '', component: DashboardComponent, children: itemRoutes},
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        pathMatch:'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch:'full'
    },
    {
        path: 'protected',
        component: ProtectedComponent,
        pathMatch:'full'
        //canActivate:[AuthGuardService]
    },
    {path: '**', redirectTo: '/'}
];


@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
