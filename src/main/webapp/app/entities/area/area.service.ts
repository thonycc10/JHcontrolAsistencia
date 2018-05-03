import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Area } from './area.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Area>;

@Injectable()
export class AreaService {

    private resourceUrl =  SERVER_API_URL + 'api/areas';

    constructor(private http: HttpClient) { }

    create(area: Area): Observable<EntityResponseType> {
        const copy = this.convert(area);
        return this.http.post<Area>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(area: Area): Observable<EntityResponseType> {
        const copy = this.convert(area);
        return this.http.put<Area>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Area>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Area[]>> {
        const options = createRequestOption(req);
        return this.http.get<Area[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Area[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Area = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Area[]>): HttpResponse<Area[]> {
        const jsonResponse: Area[] = res.body;
        const body: Area[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Area.
     */
    private convertItemFromServer(area: Area): Area {
        const copy: Area = Object.assign({}, area);
        return copy;
    }

    /**
     * Convert a Area to a JSON which can be sent to the server.
     */
    private convert(area: Area): Area {
        const copy: Area = Object.assign({}, area);
        return copy;
    }
}
