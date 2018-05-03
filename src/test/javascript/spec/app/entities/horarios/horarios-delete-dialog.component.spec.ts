/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { HorariosDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/horarios/horarios-delete-dialog.component';
import { HorariosService } from '../../../../../../main/webapp/app/entities/horarios/horarios.service';

describe('Component Tests', () => {

    describe('Horarios Management Delete Component', () => {
        let comp: HorariosDeleteDialogComponent;
        let fixture: ComponentFixture<HorariosDeleteDialogComponent>;
        let service: HorariosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [HorariosDeleteDialogComponent],
                providers: [
                    HorariosService
                ]
            })
            .overrideTemplate(HorariosDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HorariosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorariosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
