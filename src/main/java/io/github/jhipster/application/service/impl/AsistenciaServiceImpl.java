package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AsistenciaService;
import io.github.jhipster.application.domain.Asistencia;
import io.github.jhipster.application.repository.AsistenciaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Asistencia.
 */
@Service
@Transactional
public class AsistenciaServiceImpl implements AsistenciaService {

    private final Logger log = LoggerFactory.getLogger(AsistenciaServiceImpl.class);

    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaServiceImpl(AsistenciaRepository asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }

    /**
     * Save a asistencia.
     *
     * @param asistencia the entity to save
     * @return the persisted entity
     */
    @Override
    public Asistencia save(Asistencia asistencia) {
        log.debug("Request to save Asistencia : {}", asistencia);
        return asistenciaRepository.save(asistencia);
    }

    /**
     * Get all the asistencias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Asistencia> findAll(Pageable pageable) {
        log.debug("Request to get all Asistencias");
        return asistenciaRepository.findAll(pageable);
    }

    /**
     * Get one asistencia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Asistencia findOne(Long id) {
        log.debug("Request to get Asistencia : {}", id);
        return asistenciaRepository.findOne(id);
    }

    /**
     * Delete the asistencia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Asistencia : {}", id);
        asistenciaRepository.delete(id);
    }
}
