package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.HorariosService;
import io.github.jhipster.application.domain.Horarios;
import io.github.jhipster.application.repository.HorariosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Horarios.
 */
@Service
@Transactional
public class HorariosServiceImpl implements HorariosService {

    private final Logger log = LoggerFactory.getLogger(HorariosServiceImpl.class);

    private final HorariosRepository horariosRepository;

    public HorariosServiceImpl(HorariosRepository horariosRepository) {
        this.horariosRepository = horariosRepository;
    }

    /**
     * Save a horarios.
     *
     * @param horarios the entity to save
     * @return the persisted entity
     */
    @Override
    public Horarios save(Horarios horarios) {
        log.debug("Request to save Horarios : {}", horarios);
        return horariosRepository.save(horarios);
    }

    /**
     * Get all the horarios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Horarios> findAll(Pageable pageable) {
        log.debug("Request to get all Horarios");
        return horariosRepository.findAll(pageable);
    }

    /**
     * Get one horarios by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Horarios findOne(Long id) {
        log.debug("Request to get Horarios : {}", id);
        return horariosRepository.findOne(id);
    }

    /**
     * Delete the horarios by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Horarios : {}", id);
        horariosRepository.delete(id);
    }
}
