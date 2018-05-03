import { BaseEntity } from './../../shared';

export class Rol implements BaseEntity {
    constructor(
        public id?: number,
        public idrol?: number,
        public nombre?: string,
        public descripcion?: string,
    ) {
    }
}
