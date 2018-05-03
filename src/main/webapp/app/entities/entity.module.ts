import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JHcontrolAsistenciaRolModule } from './rol/rol.module';
import { JHcontrolAsistenciaUsuarioModule } from './usuario/usuario.module';
import { JHcontrolAsistenciaEmpleadoModule } from './empleado/empleado.module';
import { JHcontrolAsistenciaAsistenciaModule } from './asistencia/asistencia.module';
import { JHcontrolAsistenciaAreaModule } from './area/area.module';
import { JHcontrolAsistenciaHorariosModule } from './horarios/horarios.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JHcontrolAsistenciaRolModule,
        JHcontrolAsistenciaUsuarioModule,
        JHcontrolAsistenciaEmpleadoModule,
        JHcontrolAsistenciaAsistenciaModule,
        JHcontrolAsistenciaAreaModule,
        JHcontrolAsistenciaHorariosModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHcontrolAsistenciaEntityModule {}
