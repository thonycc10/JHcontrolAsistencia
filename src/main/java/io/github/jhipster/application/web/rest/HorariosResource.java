package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Horarios;
import io.github.jhipster.application.service.HorariosService;
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
 * REST controller for managing Horarios.
 */
@RestController
@RequestMapping("/api")
public class HorariosResource {

    private final Logger log = LoggerFactory.getLogger(HorariosResource.class);

    private static final String ENTITY_NAME = "horarios";

    private final HorariosService horariosService;

    public HorariosResource(HorariosService horariosService) {
        this.horariosService = horariosService;
    }

    /**
     * POST  /horarios : Create a new horarios.
     *
     * @param horarios the horarios to create
     * @return the ResponseEntity with status 201 (Created) and with body the new horarios, or with status 400 (Bad Request) if the horarios has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/horarios")
    @Timed
    public ResponseEntity<Horarios> createHorarios(@RequestBody Horarios horarios) throws URISyntaxException {
        log.debug("REST request to save Horarios : {}", horarios);
        if (horarios.getId() != null) {
            throw new BadRequestAlertException("A new horarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Horarios result = horariosService.save(horarios);
        return ResponseEntity.created(new URI("/api/horarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /horarios : Updates an existing horarios.
     *
     * @param horarios the horarios to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated horarios,
     * or with status 400 (Bad Request) if the horarios is not valid,
     * or with status 500 (Internal Server Error) if the horarios couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/horarios")
    @Timed
    public ResponseEntity<Horarios> updateHorarios(@RequestBody Horarios horarios) throws URISyntaxException {
        log.debug("REST request to update Horarios : {}", horarios);
        if (horarios.getId() == null) {
            return createHorarios(horarios);
        }
        Horarios result = horariosService.save(horarios);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, horarios.getId().toString()))
            .body(result);
    }

    /**
     * GET  /horarios : get all the horarios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of horarios in body
     */
    @GetMapping("/horarios")
    @Timed
    public ResponseEntity<List<Horarios>> getAllHorarios(Pageable pageable) {
        log.debug("REST request to get a page of Horarios");
        Page<Horarios> page = horariosService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/horarios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /horarios/:id : get the "id" horarios.
     *
     * @param id the id of the horarios to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the horarios, or with status 404 (Not Found)
     */
    @GetMapping("/horarios/{id}")
    @Timed
    public ResponseEntity<Horarios> getHorarios(@PathVariable Long id) {
        log.debug("REST request to get Horarios : {}", id);
        Horarios horarios = horariosService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(horarios));
    }

    /**
     * DELETE  /horarios/:id : delete the "id" horarios.
     *
     * @param id the id of the horarios to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/horarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteHorarios(@PathVariable Long id) {
        log.debug("REST request to delete Horarios : {}", id);
        horariosService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
