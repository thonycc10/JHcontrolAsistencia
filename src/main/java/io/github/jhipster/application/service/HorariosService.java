package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Horarios;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Horarios.
 */
public interface HorariosService {

    /**
     * Save a horarios.
     *
     * @param horarios the entity to save
     * @return the persisted entity
     */
    Horarios save(Horarios horarios);

    /**
     * Get all the horarios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Horarios> findAll(Pageable pageable);

    /**
     * Get the "id" horarios.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Horarios findOne(Long id);

    /**
     * Delete the "id" horarios.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
