import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHcontrolAsistenciaSharedModule } from '../../shared';
import {
    RolService,
    RolPopupService,
    RolComponent,
    RolDetailComponent,
    RolDialogComponent,
    RolPopupComponent,
    RolDeletePopupComponent,
    RolDeleteDialogComponent,
    rolRoute,
    rolPopupRoute,
    RolResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...rolRoute,
    ...rolPopupRoute,
];

@NgModule({
    imports: [
        JHcontrolAsistenciaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RolComponent,
        RolDetailComponent,
        RolDialogComponent,
        RolDeleteDialogComponent,
        RolPopupComponent,
        RolDeletePopupComponent,
    ],
    entryComponents: [
        RolComponent,
        RolDialogComponent,
        RolPopupComponent,
        RolDeleteDialogComponent,
        RolDeletePopupComponent,
    ],
    providers: [
        RolService,
        RolPopupService,
        RolResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaRolModule {}
