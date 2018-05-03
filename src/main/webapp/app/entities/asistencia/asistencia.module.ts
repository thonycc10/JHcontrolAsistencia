import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHcontrolAsistenciaSharedModule } from '../../shared';
import {
    AsistenciaService,
    AsistenciaPopupService,
    AsistenciaComponent,
    AsistenciaDetailComponent,
    AsistenciaDialogComponent,
    AsistenciaPopupComponent,
    AsistenciaDeletePopupComponent,
    AsistenciaDeleteDialogComponent,
    asistenciaRoute,
    asistenciaPopupRoute,
    AsistenciaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...asistenciaRoute,
    ...asistenciaPopupRoute,
];

@NgModule({
    imports: [
        JHcontrolAsistenciaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AsistenciaComponent,
        AsistenciaDetailComponent,
        AsistenciaDialogComponent,
        AsistenciaDeleteDialogComponent,
        AsistenciaPopupComponent,
        AsistenciaDeletePopupComponent,
    ],
    entryComponents: [
        AsistenciaComponent,
        AsistenciaDialogComponent,
        AsistenciaPopupComponent,
        AsistenciaDeleteDialogComponent,
        AsistenciaDeletePopupComponent,
    ],
    providers: [
        AsistenciaService,
        AsistenciaPopupService,
        AsistenciaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaAsistenciaModule {}
