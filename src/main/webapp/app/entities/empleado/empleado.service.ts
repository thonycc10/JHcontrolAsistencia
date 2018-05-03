import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Empleado } from './empleado.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Empleado>;

@Injectable()
export class EmpleadoService {

    private resourceUrl =  SERVER_API_URL + 'api/empleados';

    constructor(private http: HttpClient) { }

    create(empleado: Empleado): Observable<EntityResponseType> {
        const copy = this.convert(empleado);
        return this.http.post<Empleado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(empleado: Empleado): Observable<EntityResponseType> {
        const copy = this.convert(empleado);
        return this.http.put<Empleado>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Empleado>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Empleado[]>> {
        const options = createRequestOption(req);
        return this.http.get<Empleado[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Empleado[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Empleado = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Empleado[]>): HttpResponse<Empleado[]> {
        const jsonResponse: Empleado[] = res.body;
        const body: Empleado[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Empleado.
     */
    private convertItemFromServer(empleado: Empleado): Empleado {
        const copy: Empleado = Object.assign({}, empleado);
        return copy;
    }

    /**
     * Convert a Empleado to a JSON which can be sent to the server.
     */
    private convert(empleado: Empleado): Empleado {
        const copy: Empleado = Object.assign({}, empleado);
        return copy;
    }
}
