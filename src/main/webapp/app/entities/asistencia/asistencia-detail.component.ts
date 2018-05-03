import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Asistencia } from './asistencia.model';
import { AsistenciaService } from './asistencia.service';

@Component({
    selector: 'jhi-asistencia-detail',
    templateUrl: './asistencia-detail.component.html'
})
export class AsistenciaDetailComponent implements OnInit, OnDestroy {

    asistencia: Asistencia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private asistenciaService: AsistenciaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAsistencias();
    }

    load(id) {
        this.asistenciaService.find(id)
            .subscribe((asistenciaResponse: HttpResponse<Asistencia>) => {
                this.asistencia = asistenciaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAsistencias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'asistenciaListModification',
            (response) => this.load(this.asistencia.id)
        );
    }
}
