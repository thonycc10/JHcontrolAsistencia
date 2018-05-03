package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Asistencia;
import io.github.jhipster.application.service.AsistenciaService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Asistencia.
 */
@RestController
@RequestMapping("/api")
public class AsistenciaResource {

    private final Logger log = LoggerFactory.getLogger(AsistenciaResource.class);

    private static final String ENTITY_NAME = "asistencia";

    private final AsistenciaService asistenciaService;

    public AsistenciaResource(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    /**
     * POST  /asistencias : Create a new asistencia.
     *
     * @param asistencia the asistencia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new asistencia, or with status 400 (Bad Request) if the asistencia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/asistencias")
    @Timed
    public ResponseEntity<Asistencia> createAsistencia(@RequestBody Asistencia asistencia) throws URISyntaxException {
        log.debug("REST request to save Asistencia : {}", asistencia);
        if (asistencia.getId() != null) {
            throw new BadRequestAlertException("A new asistencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asistencia result = asistenciaService.save(asistencia);
        return ResponseEntity.created(new URI("/api/asistencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /asistencias : Updates an existing asistencia.
     *
     * @param asistencia the asistencia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated asistencia,
     * or with status 400 (Bad Request) if the asistencia is not valid,
     * or with status 500 (Internal Server Error) if the asistencia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/asistencias")
    @Timed
    public ResponseEntity<Asistencia> updateAsistencia(@RequestBody Asistencia asistencia) throws URISyntaxException {
        log.debug("REST request to update Asistencia : {}", asistencia);
        if (asistencia.getId() == null) {
            return createAsistencia(asistencia);
        }
        Asistencia result = asistenciaService.save(asistencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, asistencia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /asistencias : get all the asistencias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of asistencias in body
     */
    @GetMapping("/asistencias")
    @Timed
    public ResponseEntity<List<Asistencia>> getAllAsistencias(Pageable pageable) {
        log.debug("REST request to get a page of Asistencias");
        Page<Asistencia> page = asistenciaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/asistencias");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /asistencias/:id : get the "id" asistencia.
     *
     * @param id the id of the asistencia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the asistencia, or with status 404 (Not Found)
     */
    @GetMapping("/asistencias/{id}")
    @Timed
    public ResponseEntity<Asistencia> getAsistencia(@PathVariable Long id) {
        log.debug("REST request to get Asistencia : {}", id);
        Asistencia asistencia = asistenciaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(asistencia));
    }

    /**
     * DELETE  /asistencias/:id : delete the "id" asistencia.
     *
     * @param id the id of the asistencia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/asistencias/{id}")
    @Timed
    public ResponseEntity<Void> deleteAsistencia(@PathVariable Long id) {
        log.debug("REST request to delete Asistencia : {}", id);
        asistenciaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
