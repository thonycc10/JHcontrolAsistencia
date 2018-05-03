import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Empleado } from './empleado.model';
import { EmpleadoPopupService } from './empleado-popup.service';
import { EmpleadoService } from './empleado.service';
import { Usuario, UsuarioService } from '../usuario';
import { Area, AreaService } from '../area';

@Component({
    selector: 'jhi-empleado-dialog',
    templateUrl: './empleado-dialog.component.html'
})
export class EmpleadoDialogComponent implements OnInit {

    empleado: Empleado;
    isSaving: boolean;

    usuarios: Usuario[];

    areas: Area[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private empleadoService: EmpleadoService,
        private usuarioService: UsuarioService,
        private areaService: AreaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'empleado-is-null'})
            .subscribe((res: HttpResponse<Usuario[]>) => {
                if (!this.empleado.usuario || !this.empleado.usuario.id) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService
                        .find(this.empleado.usuario.id)
                        .subscribe((subRes: HttpResponse<Usuario>) => {
                            this.usuarios = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.areaService.query()
            .subscribe((res: HttpResponse<Area[]>) => { this.areas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.empleado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.empleadoService.update(this.empleado));
        } else {
            this.subscribeToSaveResponse(
                this.empleadoService.create(this.empleado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Empleado>>) {
        result.subscribe((res: HttpResponse<Empleado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Empleado) {
        this.eventManager.broadcast({ name: 'empleadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    trackAreaById(index: number, item: Area) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-empleado-popup',
    template: ''
})
export class EmpleadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empleadoPopupService: EmpleadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empleadoPopupService
                    .open(EmpleadoDialogComponent as Component, params['id']);
            } else {
                this.empleadoPopupService
                    .open(EmpleadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
