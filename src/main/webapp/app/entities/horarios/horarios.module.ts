import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHcontrolAsistenciaSharedModule } from '../../shared';
import {
    HorariosService,
    HorariosPopupService,
    HorariosComponent,
    HorariosDetailComponent,
    HorariosDialogComponent,
    HorariosPopupComponent,
    HorariosDeletePopupComponent,
    HorariosDeleteDialogComponent,
    horariosRoute,
    horariosPopupRoute,
    HorariosResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...horariosRoute,
    ...horariosPopupRoute,
];

@NgModule({
    imports: [
        JHcontrolAsistenciaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HorariosComponent,
        HorariosDetailComponent,
        HorariosDialogComponent,
        HorariosDeleteDialogComponent,
        HorariosPopupComponent,
        HorariosDeletePopupComponent,
    ],
    entryComponents: [
        HorariosComponent,
        HorariosDialogComponent,
        HorariosPopupComponent,
        HorariosDeleteDialogComponent,
        HorariosDeletePopupComponent,
    ],
    providers: [
        HorariosService,
        HorariosPopupService,
        HorariosResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaHorariosModule {}
