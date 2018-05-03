package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Asistencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Asistencia.
 */
public interface AsistenciaService {

    /**
     * Save a asistencia.
     *
     * @param asistencia the entity to save
     * @return the persisted entity
     */
    Asistencia save(Asistencia asistencia);

    /**
     * Get all the asistencias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Asistencia> findAll(Pageable pageable);

    /**
     * Get the "id" asistencia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Asistencia findOne(Long id);

    /**
     * Delete the "id" asistencia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
