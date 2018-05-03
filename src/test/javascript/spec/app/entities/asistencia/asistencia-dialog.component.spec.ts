/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { AsistenciaDialogComponent } from '../../../../../../main/webapp/app/entities/asistencia/asistencia-dialog.component';
import { AsistenciaService } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.service';
import { Asistencia } from '../../../../../../main/webapp/app/entities/asistencia/asistencia.model';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado';

describe('Component Tests', () => {

    describe('Asistencia Management Dialog Component', () => {
        let comp: AsistenciaDialogComponent;
        let fixture: ComponentFixture<AsistenciaDialogComponent>;
        let service: AsistenciaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [AsistenciaDialogComponent],
                providers: [
                    EmpleadoService,
                    AsistenciaService
                ]
            })
            .overrideTemplate(AsistenciaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsistenciaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsistenciaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Asistencia(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.asistencia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'asistenciaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Asistencia();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.asistencia = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'asistenciaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
