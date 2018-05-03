import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Asistencia } from './asistencia.model';
import { AsistenciaPopupService } from './asistencia-popup.service';
import { AsistenciaService } from './asistencia.service';
import { Empleado, EmpleadoService } from '../empleado';

@Component({
    selector: 'jhi-asistencia-dialog',
    templateUrl: './asistencia-dialog.component.html'
})
export class AsistenciaDialogComponent implements OnInit {

    asistencia: Asistencia;
    isSaving: boolean;

    empleados: Empleado[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private asistenciaService: AsistenciaService,
        private empleadoService: EmpleadoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadoService.query()
            .subscribe((res: HttpResponse<Empleado[]>) => { this.empleados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.asistencia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.asistenciaService.update(this.asistencia));
        } else {
            this.subscribeToSaveResponse(
                this.asistenciaService.create(this.asistencia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Asistencia>>) {
        result.subscribe((res: HttpResponse<Asistencia>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Asistencia) {
        this.eventManager.broadcast({ name: 'asistenciaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmpleadoById(index: number, item: Empleado) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-asistencia-popup',
    template: ''
})
export class AsistenciaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asistenciaPopupService: AsistenciaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.asistenciaPopupService
                    .open(AsistenciaDialogComponent as Component, params['id']);
            } else {
                this.asistenciaPopupService
                    .open(AsistenciaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
