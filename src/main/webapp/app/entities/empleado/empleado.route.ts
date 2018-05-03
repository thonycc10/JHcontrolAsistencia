import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoPopupComponent } from './empleado-dialog.component';
import { EmpleadoDeletePopupComponent } from './empleado-delete-dialog.component';

@Injectable()
export class EmpleadoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const empleadoRoute: Routes = [
    {
        path: 'empleado',
        component: EmpleadoComponent,
        resolve: {
            'pagingParams': EmpleadoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'empleado/:id',
        component: EmpleadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empleadoPopupRoute: Routes = [
    {
        path: 'empleado-new',
        component: EmpleadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleado/:id/edit',
        component: EmpleadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleado/:id/delete',
        component: EmpleadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
