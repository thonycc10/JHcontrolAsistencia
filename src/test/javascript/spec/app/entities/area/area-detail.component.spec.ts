/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { AreaDetailComponent } from '../../../../../../main/webapp/app/entities/area/area-detail.component';
import { AreaService } from '../../../../../../main/webapp/app/entities/area/area.service';
import { Area } from '../../../../../../main/webapp/app/entities/area/area.model';

describe('Component Tests', () => {

    describe('Area Management Detail Component', () => {
        let comp: AreaDetailComponent;
        let fixture: ComponentFixture<AreaDetailComponent>;
        let service: AreaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [AreaDetailComponent],
                providers: [
                    AreaService
                ]
            })
            .overrideTemplate(AreaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Area(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.area).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
