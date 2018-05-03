import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Asistencia } from './asistencia.model';
import { AsistenciaPopupService } from './asistencia-popup.service';
import { AsistenciaService } from './asistencia.service';

@Component({
    selector: 'jhi-asistencia-delete-dialog',
    templateUrl: './asistencia-delete-dialog.component.html'
})
export class AsistenciaDeleteDialogComponent {

    asistencia: Asistencia;

    constructor(
        private asistenciaService: AsistenciaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.asistenciaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'asistenciaListModification',
                content: 'Deleted an asistencia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-asistencia-delete-popup',
    template: ''
})
export class AsistenciaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asistenciaPopupService: AsistenciaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.asistenciaPopupService
                .open(AsistenciaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
