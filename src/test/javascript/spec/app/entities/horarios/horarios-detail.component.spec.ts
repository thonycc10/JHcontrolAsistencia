/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { HorariosDetailComponent } from '../../../../../../main/webapp/app/entities/horarios/horarios-detail.component';
import { HorariosService } from '../../../../../../main/webapp/app/entities/horarios/horarios.service';
import { Horarios } from '../../../../../../main/webapp/app/entities/horarios/horarios.model';

describe('Component Tests', () => {

    describe('Horarios Management Detail Component', () => {
        let comp: HorariosDetailComponent;
        let fixture: ComponentFixture<HorariosDetailComponent>;
        let service: HorariosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [HorariosDetailComponent],
                providers: [
                    HorariosService
                ]
            })
            .overrideTemplate(HorariosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HorariosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorariosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Horarios(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.horarios).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
