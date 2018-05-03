import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Asistencia } from './asistencia.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Asistencia>;

@Injectable()
export class AsistenciaService {

    private resourceUrl =  SERVER_API_URL + 'api/asistencias';

    constructor(private http: HttpClient) { }

    create(asistencia: Asistencia): Observable<EntityResponseType> {
        const copy = this.convert(asistencia);
        return this.http.post<Asistencia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(asistencia: Asistencia): Observable<EntityResponseType> {
        const copy = this.convert(asistencia);
        return this.http.put<Asistencia>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Asistencia>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Asistencia[]>> {
        const options = createRequestOption(req);
        return this.http.get<Asistencia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Asistencia[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Asistencia = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Asistencia[]>): HttpResponse<Asistencia[]> {
        const jsonResponse: Asistencia[] = res.body;
        const body: Asistencia[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Asistencia.
     */
    private convertItemFromServer(asistencia: Asistencia): Asistencia {
        const copy: Asistencia = Object.assign({}, asistencia);
        return copy;
    }

    /**
     * Convert a Asistencia to a JSON which can be sent to the server.
     */
    private convert(asistencia: Asistencia): Asistencia {
        const copy: Asistencia = Object.assign({}, asistencia);
        return copy;
    }
}
