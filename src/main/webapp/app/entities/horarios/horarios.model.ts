import { BaseEntity } from './../../shared';

export class Horarios implements BaseEntity {
    constructor(
        public id?: number,
        public idhorarios?: number,
        public nombre?: string,
        public descripcion?: string,
        public fechainicio?: string,
        public fechafinal?: string,
        public horarioinicial?: string,
        public horariofinal?: string,
        public areas?: BaseEntity[],
    ) {
    }
}
