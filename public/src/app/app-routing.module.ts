import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent }   from './detail/detail.component';
import { CreateVRN2Component }   from './create-vrn2/create-vrn2.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'createvrn', component: CreateVRN2Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
