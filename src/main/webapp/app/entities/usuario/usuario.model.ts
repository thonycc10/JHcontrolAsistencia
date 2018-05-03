import { BaseEntity } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public idusuario?: number,
        public username?: string,
        public password?: string,
        public rols?: BaseEntity[],
    ) {
    }
}
