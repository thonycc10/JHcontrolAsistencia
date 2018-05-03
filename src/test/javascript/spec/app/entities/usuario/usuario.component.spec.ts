/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHcontrolAsistenciaTestModule } from '../../../test.module';
import { UsuarioComponent } from '../../../../../../main/webapp/app/entities/usuario/usuario.component';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario/usuario.service';
import { Usuario } from '../../../../../../main/webapp/app/entities/usuario/usuario.model';

describe('Component Tests', () => {

    describe('Usuario Management Component', () => {
        let comp: UsuarioComponent;
        let fixture: ComponentFixture<UsuarioComponent>;
        let service: UsuarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHcontrolAsistenciaTestModule],
                declarations: [UsuarioComponent],
                providers: [
                    UsuarioService
                ]
            })
            .overrideTemplate(UsuarioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Usuario(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
