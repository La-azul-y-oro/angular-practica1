import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DosComponent } from './components/dos/dos.component';
import { UnoComponent } from './components/uno/uno.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {path: 'uno', component: UnoComponent},
    {path: 'dos', component: DosComponent},
    {path: '**', component: UserComponent}
];
