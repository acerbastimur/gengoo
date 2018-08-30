import { PlayerComponent } from './../pages/player/player.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';
import { ChooseVideoComponent } from '../pages/choose-video/choose-video.component';
import { LoginComponent } from '../pages/login/login.component';


// Declare your routes here
export const appRoutes: Routes = [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'player', component: PlayerComponent },
    { path: 'choosevideo', component: ChooseVideoComponent },
    { path: 'player/:videoPath', component: PlayerComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
