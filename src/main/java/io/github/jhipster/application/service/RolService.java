package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Rol;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Rol.
 */
public interface RolService {

    /**
     * Save a rol.
     *
     * @param rol the entity to save
     * @return the persisted entity
     */
    Rol save(Rol rol);

    /**
     * Get all the rols.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Rol> findAll(Pageable pageable);

    /**
     * Get the "id" rol.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Rol findOne(Long id);

    /**
     * Delete the "id" rol.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
