import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHcontrolAsistenciaSharedModule } from '../../shared';
import {
    AreaService,
    AreaPopupService,
    AreaComponent,
    AreaDetailComponent,
    AreaDialogComponent,
    AreaPopupComponent,
    AreaDeletePopupComponent,
    AreaDeleteDialogComponent,
    areaRoute,
    areaPopupRoute,
    AreaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...areaRoute,
    ...areaPopupRoute,
];

@NgModule({
    imports: [
        JHcontrolAsistenciaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AreaComponent,
        AreaDetailComponent,
        AreaDialogComponent,
        AreaDeleteDialogComponent,
        AreaPopupComponent,
        AreaDeletePopupComponent,
    ],
    entryComponents: [
        AreaComponent,
        AreaDialogComponent,
        AreaPopupComponent,
        AreaDeleteDialogComponent,
        AreaDeletePopupComponent,
    ],
    providers: [
        AreaService,
        AreaPopupService,
        AreaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaAreaModule {}
