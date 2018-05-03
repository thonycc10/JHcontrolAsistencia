import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHcontrolAsistenciaSharedModule } from '../../shared';
import {
    EmpleadoService,
    EmpleadoPopupService,
    EmpleadoComponent,
    EmpleadoDetailComponent,
    EmpleadoDialogComponent,
    EmpleadoPopupComponent,
    EmpleadoDeletePopupComponent,
    EmpleadoDeleteDialogComponent,
    empleadoRoute,
    empleadoPopupRoute,
    EmpleadoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...empleadoRoute,
    ...empleadoPopupRoute,
];

@NgModule({
    imports: [
        JHcontrolAsistenciaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmpleadoComponent,
        EmpleadoDetailComponent,
        EmpleadoDialogComponent,
        EmpleadoDeleteDialogComponent,
        EmpleadoPopupComponent,
        EmpleadoDeletePopupComponent,
    ],
    entryComponents: [
        EmpleadoComponent,
        EmpleadoDialogComponent,
        EmpleadoPopupComponent,
        EmpleadoDeleteDialogComponent,
        EmpleadoDeletePopupComponent,
    ],
    providers: [
        EmpleadoService,
        EmpleadoPopupService,
        EmpleadoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaEmpleadoModule {}
