/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { AsistenciaComponent } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.component';
import { AsistenciaService } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.service';
import { Asistencia } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.model';

describe('Component Tests', () => {

    describe('Asistencia Management Component', () => {
        let comp: AsistenciaComponent;
        let fixture: ComponentFixture<AsistenciaComponent>;
        let service: AsistenciaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [AsistenciaComponent],
                providers: [
                    AsistenciaService
                ]
            })
            .overrideTemplate(AsistenciaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsistenciaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsistenciaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Asistencia(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.asistencias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
