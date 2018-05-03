package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.RolService;
import io.github.jhipster.application.domain.Rol;
import io.github.jhipster.application.repository.RolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Rol.
 */
@Service
@Transactional
public class RolServiceImpl implements RolService {

    private final Logger log = LoggerFactory.getLogger(RolServiceImpl.class);

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    /**
     * Save a rol.
     *
     * @param rol the entity to save
     * @return the persisted entity
     */
    @Override
    public Rol save(Rol rol) {
        log.debug("Request to save Rol : {}", rol);
        return rolRepository.save(rol);
    }

    /**
     * Get all the rols.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Rol> findAll(Pageable pageable) {
        log.debug("Request to get all Rols");
        return rolRepository.findAll(pageable);
    }

    /**
     * Get one rol by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Rol findOne(Long id) {
        log.debug("Request to get Rol : {}", id);
        return rolRepository.findOne(id);
    }

    /**
     * Delete the rol by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rol : {}", id);
        rolRepository.delete(id);
    }
}
