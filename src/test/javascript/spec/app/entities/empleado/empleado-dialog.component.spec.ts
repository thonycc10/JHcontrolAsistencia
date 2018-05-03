/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { EmpleadoDialogComponent } from '../../../../../../main/webapp/app/entities/empleado/empleado-dialog.component';
import { EmpleadoService } from '../../../../../../main/webapp/app/entities/empleado/empleado.service';
import { Empleado } from '../../../../../../main/webapp/app/entities/empleado/empleado.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { AreaService } from '../../../../../../main/webapp/app/entities/area';

describe('Component Tests', () => {

    describe('Empleado Management Dialog Component', () => {
        let comp: EmpleadoDialogComponent;
        let fixture: ComponentFixture<EmpleadoDialogComponent>;
        let service: EmpleadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [EmpleadoDialogComponent],
                providers: [
                    UsuarioService,
                    AreaService,
                    EmpleadoService
                ]
            })
            .overrideTemplate(EmpleadoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpleadoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpleadoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Empleado(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.empleado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'empleadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Empleado();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.empleado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'empleadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
