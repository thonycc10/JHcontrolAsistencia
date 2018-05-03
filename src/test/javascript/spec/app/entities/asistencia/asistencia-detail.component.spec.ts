/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { AsistenciaDetailComponent } from '../../../../../../main/webapp/app/entities/asistencia/asistencia-detail.component';
import { AsistenciaService } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.service';
import { Asistencia } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.model';

describe('Component Tests', () => {

    describe('Asistencia Management Detail Component', () => {
        let comp: AsistenciaDetailComponent;
        let fixture: ComponentFixture<AsistenciaDetailComponent>;
        let service: AsistenciaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [AsistenciaDetailComponent],
                providers: [
                    AsistenciaService
                ]
            })
            .overrideTemplate(AsistenciaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsistenciaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsistenciaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Asistencia(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.asistencia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
