/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { HorariosComponent } from '../../../../../../main/webapp/app/entities/horarios/horarios.component';
import { HorariosService } from '../../../../../../main/webapp/app/entities/horarios/horarios.service';
import { Horarios } from '../../../../../../main/webapp/app/entities/horarios/horarios.model';

describe('Component Tests', () => {

    describe('Horarios Management Component', () => {
        let comp: HorariosComponent;
        let fixture: ComponentFixture<HorariosComponent>;
        let service: HorariosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [HorariosComponent],
                providers: [
                    HorariosService
                ]
            })
            .overrideTemplate(HorariosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HorariosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorariosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Horarios(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.horarios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
