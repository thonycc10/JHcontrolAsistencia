import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AsistenciaComponent } from './asistencia.component';
import { AsistenciaDetailComponent } from './asistencia-detail.component';
import { AsistenciaPopupComponent } from './asistencia-dialog.component';
import { AsistenciaDeletePopupComponent } from './asistencia-delete-dialog.component';

@Injectable()
export class AsistenciaResolvePagingParams implements Resolve<any> {

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

export const asistenciaRoute: Routes = [
    {
        path: 'asistencia',
        component: AsistenciaComponent,
        resolve: {
            'pagingParams': AsistenciaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Asistencias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'asistencia/:id',
        component: AsistenciaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Asistencias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const asistenciaPopupRoute: Routes = [
    {
        path: 'asistencia-new',
        component: AsistenciaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Asistencias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asistencia/:id/edit',
        component: AsistenciaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Asistencias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asistencia/:id/delete',
        component: AsistenciaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Asistencias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
