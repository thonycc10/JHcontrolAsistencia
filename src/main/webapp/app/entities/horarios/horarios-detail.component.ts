import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Horarios } from './horarios.model';
import { HorariosService } from './horarios.service';

@Component({
    selector: 'jhi-horarios-detail',
    templateUrl: './horarios-detail.component.html'
})
export class HorariosDetailComponent implements OnInit, OnDestroy {

    horarios: Horarios;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private horariosService: HorariosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHorarios();
    }

    load(id) {
        this.horariosService.find(id)
            .subscribe((horariosResponse: HttpResponse<Horarios>) => {
                this.horarios = horariosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHorarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'horariosListModification',
            (response) => this.load(this.horarios.id)
        );
    }
}
