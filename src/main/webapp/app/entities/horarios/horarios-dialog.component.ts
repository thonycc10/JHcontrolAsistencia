import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Horarios } from './horarios.model';
import { HorariosPopupService } from './horarios-popup.service';
import { HorariosService } from './horarios.service';

@Component({
    selector: 'jhi-horarios-dialog',
    templateUrl: './horarios-dialog.component.html'
})
export class HorariosDialogComponent implements OnInit {

    horarios: Horarios;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private horariosService: HorariosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.horarios.id !== undefined) {
            this.subscribeToSaveResponse(
                this.horariosService.update(this.horarios));
        } else {
            this.subscribeToSaveResponse(
                this.horariosService.create(this.horarios));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Horarios>>) {
        result.subscribe((res: HttpResponse<Horarios>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Horarios) {
        this.eventManager.broadcast({ name: 'horariosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-horarios-popup',
    template: ''
})
export class HorariosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horariosPopupService: HorariosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.horariosPopupService
                    .open(HorariosDialogComponent as Component, params['id']);
            } else {
                this.horariosPopupService
                    .open(HorariosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
