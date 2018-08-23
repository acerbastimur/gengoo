import {  Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';


// Declare your routes here
export const appRoutes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent}
 ];
