package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Asistencia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Asistencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

}
