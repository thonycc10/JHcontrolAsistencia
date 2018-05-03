import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Area } from './area.model';
import { AreaPopupService } from './area-popup.service';
import { AreaService } from './area.service';
import { Horarios, HorariosService } from '../horarios';

@Component({
    selector: 'jhi-area-dialog',
    templateUrl: './area-dialog.component.html'
})
export class AreaDialogComponent implements OnInit {

    area: Area;
    isSaving: boolean;

    horarios: Horarios[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private areaService: AreaService,
        private horariosService: HorariosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.horariosService.query()
            .subscribe((res: HttpResponse<Horarios[]>) => { this.horarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.area.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaService.update(this.area));
        } else {
            this.subscribeToSaveResponse(
                this.areaService.create(this.area));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Area>>) {
        result.subscribe((res: HttpResponse<Area>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Area) {
        this.eventManager.broadcast({ name: 'areaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackHorariosById(index: number, item: Horarios) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-area-popup',
    template: ''
})
export class AreaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPopupService: AreaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.areaPopupService
                    .open(AreaDialogComponent as Component, params['id']);
            } else {
                this.areaPopupService
                    .open(AreaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
