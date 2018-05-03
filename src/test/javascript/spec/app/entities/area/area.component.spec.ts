/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { AreaComponent } from '../../../../../../main/webapp/app/entities/area/area.component';
import { AreaService } from '../../../../../../main/webapp/app/entities/area/area.service';
import { Area } from '../../../../../../main/webapp/app/entities/area/area.model';

describe('Component Tests', () => {

    describe('Area Management Component', () => {
        let comp: AreaComponent;
        let fixture: ComponentFixture<AreaComponent>;
        let service: AreaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [AreaComponent],
                providers: [
                    AreaService
                ]
            })
            .overrideTemplate(AreaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Area(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.areas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
