 import { PlayerComponent } from './../pages/player/player.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { ChooseVideoComponent } from '../pages/choose-video/choose-video.component';
import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { EnteranceComponent } from '../pages/enterance/enterance.component';


// Declare your routes here
export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'player', component: PlayerComponent },
    { path: 'choose-video', component: ChooseVideoComponent },
    { path: 'player/:videoPath', component: PlayerComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'enterance', component: EnteranceComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginComponent }
];
