import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Horarios } from './horarios.model';
import { HorariosPopupService } from './horarios-popup.service';
import { HorariosService } from './horarios.service';

@Component({
    selector: 'jhi-horarios-delete-dialog',
    templateUrl: './horarios-delete-dialog.component.html'
})
export class HorariosDeleteDialogComponent {

    horarios: Horarios;

    constructor(
        private horariosService: HorariosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horariosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'horariosListModification',
                content: 'Deleted an horarios'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horarios-delete-popup',
    template: ''
})
export class HorariosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horariosPopupService: HorariosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.horariosPopupService
                .open(HorariosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
