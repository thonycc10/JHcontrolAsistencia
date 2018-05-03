import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RolComponent } from './rol.component';
import { RolDetailComponent } from './rol-detail.component';
import { RolPopupComponent } from './rol-dialog.component';
import { RolDeletePopupComponent } from './rol-delete-dialog.component';

@Injectable()
export class RolResolvePagingParams implements Resolve<any> {

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

export const rolRoute: Routes = [
    {
        path: 'rol',
        component: RolComponent,
        resolve: {
            'pagingParams': RolResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rol/:id',
        component: RolDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolPopupRoute: Routes = [
    {
        path: 'rol-new',
        component: RolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rol/:id/edit',
        component: RolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rol/:id/delete',
        component: RolDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rols'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
