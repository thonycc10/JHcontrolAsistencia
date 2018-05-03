package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Usuario.
 */
public interface UsuarioService {

    /**
     * Save a usuario.
     *
     * @param usuario the entity to save
     * @return the persisted entity
     */
    Usuario save(Usuario usuario);

    /**
     * Get all the usuarios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Usuario> findAll(Pageable pageable);

    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Usuario findOne(Long id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
