import {  Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent}
 ];
