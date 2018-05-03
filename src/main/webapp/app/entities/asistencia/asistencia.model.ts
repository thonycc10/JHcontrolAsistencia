import { BaseEntity } from './../../shared';

export class Asistencia implements BaseEntity {
    constructor(
        public id?: number,
        public idasistencia?: number,
        public fecharegistroinicial?: string,
        public fecharegistrofinal?: string,
        public enumtipoAsistencia?: string,
        public empleado?: BaseEntity,
    ) {
    }
}
