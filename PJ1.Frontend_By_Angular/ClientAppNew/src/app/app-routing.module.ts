import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OneComponent} from "./one/one.component";
import {TwoComponent} from "./two/two.component";
import {ThreeComponent} from "./three/three.component";

const routes: Routes = [
  {
    path: '',
    component: OneComponent,
    pathMatch:'full'
  },
  {
    path: 'two',
    component: TwoComponent,
    pathMatch:'full'
  },
  {
    path: 'three',
    component: ThreeComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
