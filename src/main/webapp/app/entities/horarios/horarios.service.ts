import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Horarios } from './horarios.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Horarios>;

@Injectable()
export class HorariosService {

    private resourceUrl =  SERVER_API_URL + 'api/horarios';

    constructor(private http: HttpClient) { }

    create(horarios: Horarios): Observable<EntityResponseType> {
        const copy = this.convert(horarios);
        return this.http.post<Horarios>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(horarios: Horarios): Observable<EntityResponseType> {
        const copy = this.convert(horarios);
        return this.http.put<Horarios>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Horarios>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Horarios[]>> {
        const options = createRequestOption(req);
        return this.http.get<Horarios[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Horarios[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Horarios = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Horarios[]>): HttpResponse<Horarios[]> {
        const jsonResponse: Horarios[] = res.body;
        const body: Horarios[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Horarios.
     */
    private convertItemFromServer(horarios: Horarios): Horarios {
        const copy: Horarios = Object.assign({}, horarios);
        return copy;
    }

    /**
     * Convert a Horarios to a JSON which can be sent to the server.
     */
    private convert(horarios: Horarios): Horarios {
        const copy: Horarios = Object.assign({}, horarios);
        return copy;
    }
}
