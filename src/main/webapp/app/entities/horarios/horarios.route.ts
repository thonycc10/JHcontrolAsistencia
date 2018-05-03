import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { HorariosComponent } from './horarios.component';
import { HorariosDetailComponent } from './horarios-detail.component';
import { HorariosPopupComponent } from './horarios-dialog.component';
import { HorariosDeletePopupComponent } from './horarios-delete-dialog.component';

@Injectable()
export class HorariosResolvePagingParams implements Resolve<any> {

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

export const horariosRoute: Routes = [
    {
        path: 'horarios',
        component: HorariosComponent,
        resolve: {
            'pagingParams': HorariosResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'horarios/:id',
        component: HorariosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horariosPopupRoute: Routes = [
    {
        path: 'horarios-new',
        component: HorariosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'horarios/:id/edit',
        component: HorariosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'horarios/:id/delete',
        component: HorariosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Horarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
