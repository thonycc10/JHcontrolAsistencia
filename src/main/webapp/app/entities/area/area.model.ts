import { BaseEntity } from './../../shared';

export class Area implements BaseEntity {
    constructor(
        public id?: number,
        public idarea?: number,
        public nombre?: string,
        public descripcion?: string,
        public empleados?: BaseEntity[],
        public horarios?: BaseEntity,
    ) {
    }
}
