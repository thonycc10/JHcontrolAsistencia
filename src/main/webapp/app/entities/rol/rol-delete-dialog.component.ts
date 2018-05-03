import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Rol } from './rol.model';
import { RolPopupService } from './rol-popup.service';
import { RolService } from './rol.service';

@Component({
    selector: 'jhi-rol-delete-dialog',
    templateUrl: './rol-delete-dialog.component.html'
})
export class RolDeleteDialogComponent {

    rol: Rol;

    constructor(
        private rolService: RolService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rolListModification',
                content: 'Deleted an rol'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rol-delete-popup',
    template: ''
})
export class RolDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolPopupService: RolPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rolPopupService
                .open(RolDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
