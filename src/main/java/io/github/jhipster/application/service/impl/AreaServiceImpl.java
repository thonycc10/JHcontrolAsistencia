package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AreaService;
import io.github.jhipster.application.domain.Area;
import io.github.jhipster.application.repository.AreaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Area.
 */
@Service
@Transactional
public class AreaServiceImpl implements AreaService {

    private final Logger log = LoggerFactory.getLogger(AreaServiceImpl.class);

    private final AreaRepository areaRepository;

    public AreaServiceImpl(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    /**
     * Save a area.
     *
     * @param area the entity to save
     * @return the persisted entity
     */
    @Override
    public Area save(Area area) {
        log.debug("Request to save Area : {}", area);
        return areaRepository.save(area);
    }

    /**
     * Get all the areas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Area> findAll(Pageable pageable) {
        log.debug("Request to get all Areas");
        return areaRepository.findAll(pageable);
    }

    /**
     * Get one area by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Area findOne(Long id) {
        log.debug("Request to get Area : {}", id);
        return areaRepository.findOne(id);
    }

    /**
     * Delete the area by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Area : {}", id);
        areaRepository.delete(id);
    }
}
