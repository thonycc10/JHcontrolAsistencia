import { BaseEntity } from './../../shared';

export class Empleado implements BaseEntity {
    constructor(
        public id?: number,
        public idempleado?: number,
        public nombre?: string,
        public apellido?: string,
        public nacimiento?: string,
        public documento?: string,
        public foto?: string,
        public direccion?: string,
        public telefono?: string,
        public usuario?: BaseEntity,
        public asistencias?: BaseEntity[],
        public area?: BaseEntity,
    ) {
    }
}
