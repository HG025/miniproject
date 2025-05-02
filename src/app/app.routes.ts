import { Routes } from '@angular/router';
import { content } from './shared/routes/routes';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadChildren: () => import('./components/auth/auth.routes').then(m => m.auth)
    },
    {
        path: '',
        children: content
    }
];
