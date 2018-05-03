import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Area } from './area.model';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-detail',
    templateUrl: './area-detail.component.html'
})
export class AreaDetailComponent implements OnInit, OnDestroy {

    area: Area;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private areaService: AreaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAreas();
    }

    load(id) {
        this.areaService.find(id)
            .subscribe((areaResponse: HttpResponse<Area>) => {
                this.area = areaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAreas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'areaListModification',
            (response) => this.load(this.area.id)
        );
    }
}
