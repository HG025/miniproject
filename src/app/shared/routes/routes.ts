import { Routes } from "@angular/router";

export const content : Routes = [
    {
        path: '',
        loadChildren: () => import('../../components/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
    },
    {
        path: '',
        loadChildren: () => import('../../components/appbar/appbar.routes').then(r => r.appbarRoutes)
    },
    {
        path: '',
        loadChildren: () => import('../../components/employee/employee.routes').then(r => r.employeeRoutes)
    }

]